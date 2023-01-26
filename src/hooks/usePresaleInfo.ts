import { formatUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';

import RaffleMarketPlaceABI from '../constants/ABI/RaffleMarketPlace.json';
import {
  RAFFLEMARKETPLACE_ADDRESS,
  DIYTOKEN_DECIMALS,
  ETHCOIN_DECIMALS,
} from '../constants/contracts';
import { getNetworkLibrary } from '../utils';
import { useContract } from './useContract';
import { useIsMounted } from './useIsMounted';
import { useNetworkConnector } from './useNetworkConnector';
import { useWeb3Provider } from './useWeb3Provider';

export const usePresaleInfo = () => {
  const presaleContract = useContract(RAFFLEMARKETPLACE_ADDRESS, RaffleMarketPlaceABI);
  const isMounted = useIsMounted();
  const { account } = useWeb3Provider();
  const network = useNetworkConnector();
  const networkLibrary = getNetworkLibrary(network);

  const [presaleInfo, setPresaleInfo] = useState<{
    ethAmount?: number;
    isSelling?: boolean;
    startDateTime?: any;
    endDateTime?: any;
    durationSeconds?: number;
    countDown?: number;
    buyRate?: number;
    tokensForSale?: number;
    tokensSold?: number;
    coinRaised?: number;
    tokensRemained?: number;
    coinsRemained?: number;
    purchasedAmount?: number;
    purchasedUsers?: number;
  }>({});

  const fetchPresaleInfo = useCallback(() => {
      const buyRate = 0;
      const coinRaised = 0;
      const coinsRemained = 0;
      const countDown = 0;
      const durationSeconds = 0;
      const endDateTime = "";
      const ethAmount = 0;
      const isSelling = true;
      const purchasedAmount = 0;
      const purchasedUsers = 0;
      const startDateTime = "";
      const tokensForSale = 0;
      const tokensRemained = 0;
      const tokensSold = 0;
      setPresaleInfo({
        buyRate,
        coinRaised,
        coinsRemained,
        countDown,
        durationSeconds,
        endDateTime,
        ethAmount,
        isSelling,
        purchasedAmount,
        purchasedUsers,
        startDateTime,
        tokensForSale,
        tokensRemained,
        tokensSold
      });
    // if (presaleContract) {
    //   Promise.all([
    //     account ? networkLibrary.getBalance(account) : 0,
    //     presaleContract.tokenAllocations(1),
    //     presaleContract.presaleFunds(0),
    //     presaleContract.presaleContext(),
    //     account ? presaleContract.purchasedUserMap(account) : null,
    //     presaleContract.purchasedUserCount(),
    //   ])
    //     .then(
    //       ([ethBalance, tokenAllocation, presaleFund, presaleContext, purchasedContext, purchasedUserCount]) => {
    //         if (isMounted.current) {
    //           const ethAmount = parseFloat(
    //             formatUnits(ethBalance.toString(), ETHCOIN_DECIMALS)
    //           );

    //           const isSelling = presaleContext.isSelling;
    //           const startDateTime = new Date(parseInt(presaleContext.startTime.toString()) * 1000); // seconds to milliseconds
    //           const durationSeconds = parseInt(presaleContext.duration.toString());
    //           const endDateTime = new Date(
    //             (parseInt(presaleContext.startTime.toString()) + durationSeconds) * 1000
    //           );
    //           const countDown = (endDateTime.getTime() - Date.now()) / 1000;
    //           const buyRate =  parseFloat(presaleFund.priceRate.toString());

    //           const tokensForSale = parseFloat(
    //             formatUnits(tokenAllocation.allocationAmount.toString(), DIYTOKEN_DECIMALS)
    //           );
    //           const tokensSold = parseFloat(
    //             formatUnits(tokenAllocation.allocatedAmount.toString(), DIYTOKEN_DECIMALS)
    //           );
    //           const coinRaised = parseFloat(
    //             formatUnits(presaleContext.depositedAmount.toString(), ETHCOIN_DECIMALS)
    //           );

    //           const purchasedAmount = purchasedContext ? parseFloat(
    //             formatUnits(purchasedContext.purchasedAmount.toString(), DIYTOKEN_DECIMALS)
    //           ) : 0;
    //           const tokensRemained = tokensForSale - tokensSold;
    //           const coinsRemained = tokensRemained / buyRate;

    //           let purchasedUsers = parseInt(purchasedUserCount.toString());
    //           purchasedUsers = purchasedUsers >= 2 ? purchasedUsers-2 : 0;

    //           setPresaleInfo({
    //             buyRate,
    //             coinRaised,
    //             coinsRemained,
    //             countDown,
    //             durationSeconds,
    //             endDateTime,
    //             ethAmount,
    //             isSelling,
    //             purchasedAmount,
    //             purchasedUsers,
    //             startDateTime,
    //             tokensForSale,
    //             tokensRemained,
    //             tokensSold
    //           });
    //         }
    //       }
    //     )
    //     .catch((err) => {
    //       if (isMounted.current) {
    //         console.error(err);
    //         setPresaleInfo({});
    //       }
    //     });
    // }
  }, [account, isMounted, presaleContract]);

  // useEffect(() => {
  //   fetchPresaleInfo();
  //   const timer = setInterval(() => fetchPresaleInfo(), 3000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [fetchPresaleInfo]);

  return presaleInfo;
};
