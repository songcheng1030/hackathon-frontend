import { Asset, ASSET_LIST, RAFFLEMARKETPLACE_ADDRESS } from '../constants/contracts';
import ERC721ABI from '../constants/ABI/ERC721.json';
import { useContract } from './useContract';
import { useCallback, useEffect, useState } from 'react';
import { useWeb3Provider } from './useWeb3Provider';
import { BigNumber, constants } from 'ethers';
import { useIsMounted } from './useIsMounted';
import { showNotification } from '../utils/helpers';
// import { triggerToast } from '../utils';

export const useERC721Approve = (address: string, tokenId: number) => {
  const erc721Contract = useContract(address, ERC721ABI, true);
  const { account } = useWeb3Provider();
  const [isApproved, setIsApproved] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const isMounted = useIsMounted();

  const approve = useCallback(() => {
    if (erc721Contract) {
      setIsApproving(true);
      erc721Contract
        .approve(RAFFLEMARKETPLACE_ADDRESS, tokenId)
        .then((txPreHash: any) => txPreHash.wait())
        .then(async (txHash: any) => {
          if (isMounted.current) {
            setIsApproved(true);
            // triggerToast('SUCCESS');
          }
        })
        .catch((err: any) => {
          showNotification('Approve Error', 'error');
        })
        .then(() => {
          if (isMounted.current) {
            setIsApproving(false);
          }
        });
    }
  }, [erc721Contract, isMounted]);

  useEffect(() => {
    if (account && erc721Contract) {
      erc721Contract
        .getApproved(tokenId)
        .then((value: BigNumber) => {
          if (value.toString() === RAFFLEMARKETPLACE_ADDRESS) {
            setIsApproved(true);
          } else {
            setIsApproved(false);
          }
        })
        .catch((err: any) => {
          // triggerToast('ERROR');
        })
    }
  }, [account, erc721Contract, isMounted]);

  return {
    isApproved,
    approve,
    isApproving,
  };
};
