import tw from 'twin.macro';

import { GNftData, GOwnedNft } from '../types';
import { addressFormat } from '../utils/helpers'

import img1 from '../assets/images/icon/nftSample.svg';
import img2 from '../assets/images/icon/check-mark-blue.svg';

const NftInfo = (props:{nft: GOwnedNft}) => {
  const nft: GOwnedNft = props.nft;

  return (
    <>
      <div tw="hidden md:flex">
        <img alt="metamask" src={img1} tw="w-14 h-14 rounded-lg"/>
        <div tw="ml-5">
          <div tw="flex flex-col md:flex-row">
            <div tw="text-[20px] md:text-2xl mb-1 md:mb-0 font-semibold text-gray-300">{nft?.title}</div>
            {/* <div tw="text-xs md:text-sm text-gray-800 md:ml-3 border rounded border-zinc-200 py-1 px-1 md:px-3 bg-white" style={{width:"fix-content"}} >Rank: 4,550/10,000</div> */}
          </div>

          <div tw="flex">
            <div tw="flex items-center">
              <div tw="text-gray-50 text-sm">Collection:</div>
              <img alt="metamask" src={img2} tw="w-3 h-3 mx-1"/>
              <div tw="text-blue-100 text-sm w-[100px]" className="text-overflow">{nft.title}</div>  
            </div>
            <div tw="text-gray-50 px-2">·</div>
            <div tw="flex items-center">
              <div tw="text-gray-50 text-sm">Created by:</div>
              <img alt="metamask" src={img2} tw="w-3 h-3 mx-1"/>
              <a tw="text-blue-100 text-sm mx-1.5 cursor-pointer w-[77px]" className="text-overflow" target="_blank" href={`https://rinkeby.etherscan.io/address/${nft?.creatorAddress}`}>{nft?.creator?.name?nft?.creator?.name:addressFormat(nft?.creatorAddress)}</a>  
            </div>
            <div tw="text-gray-50 px-2">·</div>
            <div tw="flex items-center">
              <div tw="text-gray-50 text-sm">Owned by:</div>
              {/* <img alt="metamask" src={img2} tw="w-3 h-3 mx-1.5"/> */}
              <a tw="text-blue-100 pr-1.5 text-sm mx-1.5 cursor-pointer w-[77px]" className="text-overflow" target="_blank" href={`https://rinkeby.etherscan.io/address/${nft?.owneraccount}`}>{nft?.owner?.name?nft?.owner?.name:addressFormat(nft?.owneraccount)}</a>  
            </div>
          </div>
        </div>            
      </div>

      <div tw="md:hidden">
        <div tw="flex items-center justify-center">
          <img alt="metamask" src={img1} tw="w-14 h-14 rounded-lg mr-4"/>
          <div tw="flex flex-col md:flex-row">
              <div tw="text-[20px] md:text-2xl mb-1 md:mb-0 font-semibold text-gray-300">{nft.title}</div>
              {/* <div tw="text-xs md:text-sm text-gray-800 md:ml-3 border rounded border-zinc-200 py-1 px-1 md:px-3 bg-white" style={{width:"fix-content"}} >Rank: 4,550/10,000</div> */}
          </div>
        </div>

        <div tw="flex justify-around mt-6">
          <div tw="">
            <div tw="text-gray-50 text-sm mb-1">Collection:</div>
            <div tw="flex items-center justify-center">
              <div tw="text-blue-100 text-sm">{nft.title}</div>  
              <img alt="metamask" src={img2} tw="w-3 h-3 ml-1"/>
            </div>
          </div>
          <div tw="">
            <div tw="text-gray-50 text-sm mx-auto mb-1">Created by:</div>
            <div tw="flex items-center justify-center">
            <a tw="text-blue-100 text-sm mx-1.5 cursor-pointer" target="_blank" href={`https://rinkeby.etherscan.io/address/${nft?.creatorAddress}`}>{nft?.creator?.name?nft?.creator?.name:addressFormat(nft?.creatorAddress)}</a>  
              <img alt="metamask" src={img2} tw="w-3 h-3 ml-1"/>
            </div>
          </div>
          <div tw="">
            <div tw="text-gray-50 text-sm mb-1">Owned by:</div>
            {/* <img alt="metamask" src={img2} tw="w-3 h-3 mx-1.5"/> */}
            <a tw="text-blue-100 text-sm mx-1.5 cursor-pointer" target="_blank" href={`https://rinkeby.etherscan.io/address/${nft?.owneraccount}`}>{nft?.owner?.name?nft?.owner?.name:addressFormat(nft?.owneraccount)}</a>  
          </div>
        </div>
      </div>
    </>
  );
};
export default NftInfo;
