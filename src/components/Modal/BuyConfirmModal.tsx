import tw from 'twin.macro';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'antd';
import { useBuy } from '../../hooks';
import { selectNftByTokenId } from "../../store/raffles/raffles.selectors";
import { addressFormat } from '../../utils/helpers';
import { imageConvert } from "../../utils/helpers";

const BuyConfirmModal = (props: {isConfirmModalVisible: boolean, txHash: any, ticketNumber: number, ticketName: string, handleConfirmOk: ()=>void, handleConfirmCancel: ()=>void }) =>{

  const raffleNumber = `${props.ticketNumber} raffle tickets`;
  const name = props.ticketName;
  const nft = useSelector(selectNftByTokenId);

  return(
    <Modal visible={props.isConfirmModalVisible} onOk={props.handleConfirmOk} onCancel={props.handleConfirmCancel} footer={null}>
      <div tw="text-gray-300 text-2xl font-semibold text-center">
        Ticket purchase confirmed!
      </div>
      <div tw="text-base text-gray-800 text-center mt-6">
        LFG! You successfully purchased <span tw="text-base text-gray-800 font-semibold">{raffleNumber}</span> <br></br>for <span tw="text-base text-gray-800 font-semibold">{name}</span>. Good luck!
      </div>
      <div tw="flex justify-center mt-4">
        <img alt="metamask" src={imageConvert(nft.metadata?.image)} tw="w-[167px] h-[167px] rounded-xl"/>
      </div>
      {props.txHash && 
        <div tw="w-[300px] border border-solid rounded-lg m-auto px-5 py-3 mt-6">
          <div tw="grid grid-cols-2 gap-3">
            <div>
              <div tw="text-[#1d1d1d] text-xs">Status</div>
              <div tw="text-[#522294] text-sm">{props.txHash?.status==1?'Completed':''}</div>
            </div>
            <div>
              <div tw="text-[#1d1d1d] text-xs">Transaction Hash</div>
              <div tw="text-[#522294] text-sm">{addressFormat(props.txHash?.transactionHash)}</div>
              {/* <a tw="text-[#522294] text-sm" target="_blank" href={`https://rinkeby.etherscan.io/address/${props.txHash?.transactionHash}`}>{addressFormat(props.txHash?.transactionHash)}</a> */}
            </div>
          </div>
        </div>
      }
    </Modal>
  )
}

export default BuyConfirmModal;
  