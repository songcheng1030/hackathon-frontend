import tw from 'twin.macro';
import { parseEther } from 'ethers/lib/utils';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRaffleById, selectNftByTokenId } from "../../store/raffles/raffles.selectors";
import { Modal, Divider } from 'antd';
import { SpinnerCircularFixed } from 'spinners-react';
import { useCancelRaffle } from '../../hooks';
import { GTicket } from '../../types';
import SellConfirmModal from './SellConfirmModal';
import { getDurationDate } from '../../utils/helpers';
import { selectEthPrice } from '../../store/ethPrice/ethPrice.selectors';
import checkMarkBlue from '../../assets/images/icon/check-mark-blue.svg';
import eth from '../../assets/images/icon/eth-icon.svg';
import arrowDown from '../../assets/images/icon/arrow-down.png';
import arrowUp from '../../assets/images/icon/arrow-up.png';
import check from '../../assets/images/icon/check.png';
import error from '../../assets/images/icon/tooltip.png';
import { imageConvert } from "../../utils/helpers";

const CancelRaffleModal = (props: {isCancelModalVisible: boolean, handleCancelOk: ()=>void, handleCancel: ()=>void }) =>{
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const raffle = useSelector(selectRaffleById);
  const nft = useSelector(selectNftByTokenId);
  const price = useSelector(selectEthPrice);
  const { isRaffleCanceled, isRaffleCanceling, cancelRaffle } = useCancelRaffle();
  const [modalFlag, setModalFlag] = useState(true);

  useEffect(() => {
    if (props.isCancelModalVisible){
      if (!isRaffleCanceled && !isRaffleCanceling) { 
        cancelRaffle(raffle.raffleId);  
      }
      if (isRaffleCanceled) {
        props.handleCancelOk();
      }
    }
  }, [isRaffleCanceled, isRaffleCanceling, props.isCancelModalVisible])
  
  const handleConfirmOk = () => {
    setIsConfirmModalVisible(false);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
  };

  return(
    <>
      <Modal maskClosable={false} visible={props.isCancelModalVisible && modalFlag} onOk={props.handleCancelOk} onCancel={props.handleCancel} footer={null} width={620}>
        <div tw="text-gray-300 text-2xl font-semibold text-center mb-6">
          Cancel raffle lisiting
        </div>
        <div tw="flex justify-between items-center">
          <div tw="flex items-center mt-3 relative">
            <img alt="metamask" src={imageConvert(nft.metadata?.image)} tw="w-[141px] h-[141px] rounded-[12px] shadow-xl"/> 
            <div tw="mr-4 ml-5">
              <div tw="flex">
                <div tw="flex items-center">
                  <div tw="text-gray-50 text-sm font-normal">Collection:</div>
                  <div tw="text-blue-100 text-sm ml-1.5">{nft.title}</div>  
                  <img alt="metamask" src={checkMarkBlue} tw="w-3 h-3 mx-1.5"/>
                </div>  
              </div>
              <div tw="text-[22px] font-semibold text-gray-300 mt-1">{nft.title}</div>
            </div>        
          </div>
          {/* <div tw="flex items-center">
            <div tw="text-center">
              <div tw="text-sm text-gray-800">Price</div>
              <div tw="flex items-center justify-center my-1">
                <img alt="metamask" src={eth} tw="w-4 h-4 mr-1"/>
                <div tw="text-gray-300 text-center text-[22px] font-semibold">{(raffle.totalPrice).toLocaleString()}</div>
              </div>
              <div tw="text-gray-800 text-center text-xs">(${Number((raffle?.totalPrice*price).toFixed(2)).toLocaleString()})</div>
            </div>
          </div> */}
        </div>

        <div tw="flex border-solid border px-7 rounded-t-lg h-28 mt-6">
          <div tw="flex items-center">
            {isRaffleCanceled?(
              <img alt="metamask" src={check} tw="w-[42px] h-[42px] mr-7"/>
            ):isRaffleCanceling?(
              <SpinnerCircularFixed thickness={100} color="#9C40CF" tw="mr-7"/>
            ):(
              <img alt="metamask" src={error} tw="w-[50px] h-[50px] mr-7"/>
            )}
            <div>
              <div tw="text-2xl text-gray-300 font-semibold">Cancel</div>
              <div tw="text-base text-gray-800">To Cancel this raffle listing.</div>
            </div>
          </div>
        </div> 
      </Modal>  
    </>
    
  )
}

export default CancelRaffleModal;
  