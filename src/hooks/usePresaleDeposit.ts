import { parseEther } from 'ethers/lib/utils';
import { useCallback, useContext, useState } from 'react';

import RaffleMarketPlaceABI from '../constants/ABI/RaffleMarketPlace.json';
import { Asset, RAFFLEMARKETPLACE_ADDRESS } from '../constants/contracts';
import { GSellTicket } from '../types';
import { useContract } from './useContract';
import { useIsMounted } from './useIsMounted';
import { showNotification } from '../utils/helpers';

export const usePresaleDeposit = () => {
  const raffleMarketContract = useContract(RAFFLEMARKETPLACE_ADDRESS, RaffleMarketPlaceABI, true);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isDeposited, setIsDeposited] = useState(false);
  const isMounted = useIsMounted();

  const deposit = useCallback(
    (info: GSellTicket) => {
      if (raffleMarketContract) {
        setIsDepositing(true);

        raffleMarketContract
          .registerRaffle(info.nftAddress, info.tokenId, info.ticketType, parseEther(info.ticketPrice.toString()), info.duration, { value: parseEther("0.01") })
          .then((txPreHash: any) => txPreHash.wait())
          .then(async (txHash: any) => {
            if (isMounted.current) {
              setIsDeposited(true);
            }        
          })
          .catch((err: any) => {
            console.error(err);
            showNotification('Confirm Error', 'error');
          })
          .then(() => {
            if (isMounted.current) {
              setIsDepositing(false);
            }
          });
      }
    },
    [raffleMarketContract, isMounted]
  );

  return {
    deposit,
    isDepositing,
    isDeposited
  };
};
