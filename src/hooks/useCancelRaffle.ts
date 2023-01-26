import { parseEther } from 'ethers/lib/utils';
import { useCallback, useContext, useState } from 'react';

import RaffleMarketPlaceABI from '../constants/ABI/RaffleMarketPlace.json';
import { Asset, RAFFLEMARKETPLACE_ADDRESS } from '../constants/contracts';
import { GSellTicket } from '../types';
import { useContract } from './useContract';
import { useIsMounted } from './useIsMounted';
import { showNotification } from '../utils/helpers';

export const useCancelRaffle = () => {
  const raffleMarketContract = useContract(RAFFLEMARKETPLACE_ADDRESS, RaffleMarketPlaceABI, true);
  const [isRaffleCanceling, setIsRafflecanceling] = useState(false);
  const [isRaffleCanceled, setIsRaffleCanceled] = useState(false);
  const isMounted = useIsMounted();

  const cancelRaffle = useCallback(
    (raffleId) => {
      if (raffleMarketContract) {
        setIsRafflecanceling(true);

        raffleMarketContract
          .cancelRaffle(raffleId)
          .then((txPreHash: any) => txPreHash.wait())
          .then(async (txHash: any) => {
            if (isMounted.current) {
              setIsRaffleCanceled(true);
            }        
          })
          .catch((err: any) => {
            console.error(err);
            showNotification('Confirm Error', 'error');
          })
          .then(() => {
            if (isMounted.current) {
              setIsRafflecanceling(false);
            }
          });
      }
    },
    [raffleMarketContract, isMounted]
  );

  return {
    cancelRaffle,
    isRaffleCanceling,
    isRaffleCanceled
  };
};
