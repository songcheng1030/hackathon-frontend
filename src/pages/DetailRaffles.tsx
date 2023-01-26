import tw, { styled } from 'twin.macro';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEagerConnect, useWeb3Listener } from '../hooks';
import DetailImage from '../components/DetailImage';
import NftInfo from '../components/NftInfo';
import RaffleInfo from '../components/RaffleInfo';
import NftHistoryInfo from '../components/NftHistoryInfo';
import NftDetailInfo from '../components/NftDetailInfo';
import { getRafflesById } from '../store/raffles/raffles.actions';
import { getEthPrice } from '../store/ethPrice/ethPrice.actions';
import { selectRaffleById, selectNftByTokenId } from "../store/raffles/raffles.selectors";


const StyledPage = styled.div`
  ${tw`w-full`}
  height: calc(100vh - 110px);
  background: linear-gradient(180deg, #FBF8FB 350px, #FFFFFF 350px) !important;
  
  @media (min-width: 768px) {
    background: linear-gradient(180deg, #FBF8FB 105px, #FFFFFF 105px) !important;
  }
`;
interface Params {
  raffle_id: string
}

const DetailRaffles = () => {
  const dispatch = useDispatch();
  
  useEagerConnect();
  useWeb3Listener();
  
  const params: Params = useParams();

  useEffect(() => {
    dispatch(getRafflesById(Number(params?.raffle_id)));
    dispatch(getEthPrice());
  }, [dispatch]);

  const raffle = useSelector(selectRaffleById) || {};
  const nft = useSelector(selectNftByTokenId);

  const status = {
    views: 1280,
    likes: 243
  }

  return (
    <StyledPage>
      <div tw="mx-auto max-w-7xl pt-4 px-3 pb-32">
        <div tw="grid-cols-5 lg:grid gap-8">
          <div tw="col-start-3 col-end-7 text-gray-300">
            <NftInfo nft={nft}></NftInfo>
          </div>
          <div tw="col-start-1 col-span-2 text-gray-300 mt-4 lg:mt-[-90px] px-2 lg:px-0">
            <DetailImage status={status} image={nft?.metadata?.image}></DetailImage>
            <div tw="mt-6 hidden lg:block">
              <NftDetailInfo nft={nft}></NftDetailInfo>
            </div>
          </div>
          <div tw="col-start-3 col-end-6 text-gray-300">
            <div tw="mt-10">
            </div>
              <RaffleInfo raffle={raffle} raffleId={params?.raffle_id}></RaffleInfo>
            <div tw="mt-7">
              <NftHistoryInfo raffle={raffle} raffleId={params?.raffle_id}></NftHistoryInfo>
            </div>
          </div>
          <div tw="mt-6 lg:hidden">
            <NftDetailInfo nft={nft}></NftDetailInfo>
          </div>
        </div>
      </div>
    </StyledPage>
  );
};

export default DetailRaffles;
