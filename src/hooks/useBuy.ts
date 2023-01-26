import { parseEther } from 'ethers/lib/utils';
import { useCallback, useContext, useState } from 'react';

import RaffleMarketPlaceABI from '../constants/ABI/RaffleMarketPlace.json';
import { Asset, RAFFLEMARKETPLACE_ADDRESS } from '../constants/contracts';
import { UserContext } from '../contexts/UserContext';
import { numberToFloat } from '../utils';
import { useContract } from './useContract';
import { useIsMounted } from './useIsMounted';
import { showNotification } from '../utils/helpers';

export const useBuy = () => {
  const buyContract = useContract(RAFFLEMARKETPLACE_ADDRESS, RaffleMarketPlaceABI, true);
  const [isBuying, setIsBuying] = useState(false);
  const [isBuyed, setIsBuyed] = useState(false);
  const [txHashInfo, setTxHash] = useState<any>();
  const isMounted = useIsMounted();

  const buy = useCallback(
    (info: any) => {
      if (buyContract) {
        setIsBuying(true);
        buyContract
          .buyTickets(info.raffleId, info.tickets, { value: parseEther(info.buyTickets.toString())})
          .then((txPreHash: any) => txPreHash.wait())
          .then(async (txHash: any) => {
            console.log('this is txHash', txHash);
            setTxHash(txHash);
            if (isMounted.current) {
              setIsBuyed(true);
              setIsBuying(false);
            }        
          })
          .catch((err: any) => {
            showNotification('Confirm Error', 'error');
          })
          .then(() => {
            if (isMounted.current) {
              setIsBuying(false);
              setIsBuyed(false);
            }
          });
      }
    },
    [buyContract, isMounted]        
  );

  return {
    buy,
    txHashInfo,
    isBuying,
    isBuyed
  };
};
