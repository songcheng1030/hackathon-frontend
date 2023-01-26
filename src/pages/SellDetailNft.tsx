import tw, { styled } from 'twin.macro';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import NftInfo from '../components/NftInfo';
import { getAssetById } from '../store/assets/assets.actions';
import { selectAssetById } from '../store/assets/assets.selectors';
import { useEagerConnect, useWeb3Listener } from '../hooks';
import SellRaffleInfo from '../components/SellRaffleInfo';
import { getEthPrice } from '../store/ethPrice/ethPrice.actions';
import { imageConvert } from "../utils/helpers";

const StyledPage = styled.div`
  ${tw`w-full`}
  height: calc(100vh - 110px);
  background: linear-gradient(180deg, #FBF8FB 350px, #FFFFFF 350px) !important;
  
  @media (min-width: 768px) {
    background: linear-gradient(180deg, #FBF8FB 105px, #FFFFFF 105px) !important;
  }
`;
interface Params {
  address: string,
  token_id: string
}

const SellDetailNft = () => {
  
  useEagerConnect();
  useWeb3Listener();

  const dispatch = useDispatch();
  const params: Params = useParams();
  const tokenId = Number(params?.token_id);
  useEffect(() => {
    dispatch(getAssetById(params?.address, tokenId));
    dispatch(getEthPrice());
  }, [dispatch]);

  const asset = useSelector(selectAssetById);

  return (
    <StyledPage>
      <div tw="mx-auto max-w-6xl pt-4 px-3 pb-32">
        <div tw="lg:grid lg:grid-cols-5 gap-8">
          <div tw="lg:col-span-full lg:col-start-3 lg:col-end-6 text-gray-300">
            <NftInfo nft={asset}></NftInfo>
          </div>
          <div tw="col-span-full px-2 lg:px-0 mt-4 text-gray-300 lg:col-span-2 lg:mt-[-90px] ">
            {asset?.metadata?.image?(
              <img alt="metamask" src={imageConvert(asset?.metadata?.image)} tw="w-full rounded-2xl h-auto shadow-xl"/>
            ):(
              <div tw="w-full rounded-2xl h-[432px] bg-zinc-300 animate-pulse"></div>
            )}
           
          </div>
          <div tw="col-span-full lg:col-start-3 lg:col-end-6  text-gray-300">
            <div tw="mt-9">
              <SellRaffleInfo address={params.address} tokenId={tokenId}></SellRaffleInfo>
            </div>
          </div>
        </div>
      </div>
    </StyledPage>
  );
};

export default SellDetailNft;
