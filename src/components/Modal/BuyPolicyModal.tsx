import tw from 'twin.macro';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { Checkbox } from 'antd';
import dot from '../../assets/images/icon/dot.png';

const BuyPolicyModal = (props: {isPolicyModalVisible: boolean, handlePolicyOk: ()=>void, handlePolicyCancel: ()=>void }) =>{

  const [policyCheck, setPolicyCheck] = useState<Boolean>(false);

  const onChange = (e: any) => {
    setPolicyCheck(e.target.checked);
  }

  return(
    <Modal visible={props.isPolicyModalVisible} onOk={props.handlePolicyOk} onCancel={props.handlePolicyCancel} footer={null}  width={620}>
      <div tw="text-gray-300 text-2xl font-semibold text-center">
        Buying a raffle ticket
      </div>
      <div tw="text-sm text-[#626262] mt-5">Review the following conditions to ensure a full understanding of raffles</div>
      <div tw="flex items-center mt-4">
        <img alt="metamask" src={dot} tw="w-2 h-2 mr-2"/>
        <div tw="text-base text-gray-400">Raffle tickets <span tw="font-semibold">can't be cancelled or resold</span></div>
      </div>

      <div tw="flex items-center mt-4">
        <img alt="metamask" src={dot} tw="w-2 h-2 mr-2"/>
        <div tw="text-base text-gray-400">The purchase <span tw="font-semibold">funds are locked</span> until the raffle ends</div>
      </div>
      
      <div tw="flex items-center mt-4">
        <img alt="metamask" src={dot} tw="w-2 h-2 mr-2"/>
        <div tw="text-base text-gray-400">In case a raffle expired before completion, you'll recieve a <span tw="font-semibold">refund without gas fees</span></div>
      </div>
      
      <div tw="text-base text-gray-400 mt-4 mb-4">Blockchain transactions are <span tw="font-semibold">irreversibile</span></div>
      <hr></hr>
      <Checkbox onChange={(e)=>onChange(e)}>  
        <div tw="text-base font-semibold text-gray-800 mt-4">I read and agree on the raffle conditions held by GooBig</div>
      </Checkbox>
      <div tw="flex justify-center mt-5">
        {policyCheck?(
          <button onClick={props.handlePolicyOk} tw="text-white bg-[#9C40CF] text-base font-semibold px-12 py-2 rounded border border-transparent hover:border-white">
            Continue
          </button>
        ):(
          <button tw="text-[#C1A3C1] bg-[#D6C1D6] text-base font-semibold px-12 py-2 rounded border border-[#C1A3C1] hover:border-white">
            Continue
          </button>
        )}
      </div>
    </Modal>
  )
}

export default BuyPolicyModal;
  