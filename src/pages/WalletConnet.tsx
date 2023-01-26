import tw, { styled } from 'twin.macro';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../utils/helpers';
import { login } from '../store/auth/auth.actions';
import { STATUS_SUCCESS } from '../utils/constants'

import imgMetaMask from '../assets/images/icon/metamask.png';
import imgCoinBase from '../assets/images/icon/coinbase.png';
import imgWallet from '../assets/images/icon/walletconnet.png';
import { useWeb3Provider } from '../hooks';

const StyledPage = styled.div`
  ${tw`w-full bg-[#ffffff] pt-32`}
  height: calc(100vh - 110px)
`;

const WalletConnet = () => {

  const dispatch = useDispatch();
  const { activate, account } = useWeb3Provider();

  useEffect(() => {
    if (account) { 
      dispatch(login(account));
    };
  }, [account])
  
  // const onMetaMask = async() =>{
  //   const result = await connectWallet();
  //   if (result) {
  //     if ( result.status === STATUS_SUCCESS){
  //       showNotification('Wallet Connected. Ready to sign.');
  //     }  
  //     else showNotification(result.message, 'error');
  //   }
  // }


  return (
    <StyledPage>
      <div tw="mx-auto max-w-screen-sm px-3 pt-2">
        <div tw="text-3xl font-bold text-gray-300 mb-3">
          Connect your wallet
        </div>
        <div tw="text-lg text-gray-300">
          Choose one of the available wallet providers below or create a new one. <span tw="text-lg font-semibold text-gray-300">What is a wallet?</span>
        </div>
        <div tw="mt-5">
          <div onClick={() => activate('Injected')} tw="border border-solid rounded-lg border-zinc-200 px-7 py-3 mb-3 cursor-pointer hover:bg-[#FBF8FB]">
            <div tw="flex items-center">
              <img alt="metamask" src={imgMetaMask} tw="w-[32px]"/>
              <div tw="text-base font-semibold text-black ml-3">Metamask</div>
            </div>
          </div>
          <div onClick={() => activate('CoinBase')} tw="border border-solid rounded-lg border-zinc-200 px-7 py-3 mb-3 cursor-pointer hover:bg-[#FBF8FB]">
            <div tw="flex items-center">
              <img alt="coinbase" src={imgCoinBase} tw="w-[32px]"/>
              <div tw="text-base font-semibold text-black ml-3">Coinbase Wallet</div>
            </div>
          </div>
          <div onClick={() => activate('WalletConnect')} tw="border border-solid rounded-lg border-zinc-200 px-7 py-3 cursor-pointer hover:bg-[#FBF8FB]">
            <div tw="flex items-center">
              <img alt="walletconnet" src={imgWallet} tw="w-[32px]"/>
              <div tw="text-base font-semibold text-black ml-3">WalletConnect</div>
            </div>
          </div>
        </div>
      </div>
    </StyledPage>
  );
};

export default WalletConnet;
