import { parseEther } from 'ethers/lib/utils';
import { useCallback, useContext, useState } from 'react';

import RaffleMarketPlaceABI from '../constants/ABI/RaffleMarketPlace.json';
import { Asset, RAFFLEMARKETPLACE_ADDRESS } from '../constants/contracts';
import { GSellTicket } from '../types';
import { useContract } from './useContract';
import { useIsMounted } from './useIsMounted';
import { showNotification } from '../utils/helpers';

export const useExcuteRaffle = () => {
  const raffleMarketContract = useContract(RAFFLEMARKETPLACE_ADDRESS, RaffleMarketPlaceABI, true);
  const [isExcuteDrawing, setIsExcuteDrawing] = useState(false);
  const [isExcuteDrawed, setIsExcuteDrawed] = useState(false);
  const isMounted = useIsMounted();

  const excuteDraw = useCallback(
    (raffleId) => {
      if (raffleMarketContract) {
        setIsExcuteDrawing(true);

        raffleMarketContract
          .excuteRaffle(raffleId)
          .then((txPreHash: any) => txPreHash.wait())
          .then(async (txHash: any) => {
            if (isMounted.current) {
              setIsExcuteDrawed(true);
            }        
          })
          .catch((err: any) => {
            console.error(err);
            showNotification('Confirm Error', 'error');
          })
          .then(() => {
            if (isMounted.current) {
              setIsExcuteDrawing(false);
            }
          });
      }
    },
    [raffleMarketContract, isMounted]
  );

  return {
    excuteDraw,
    isExcuteDrawing,
    isExcuteDrawed
  };
};
