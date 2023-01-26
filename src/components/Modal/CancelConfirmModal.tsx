import tw from 'twin.macro';
import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import img2 from '../../assets/images/sample/sample_avatar2.png';
import { selectAssetById } from '../../store/assets/assets.selectors';
import { imageConvert } from "../../utils/helpers";
import { selectUser } from '../../store/auth/auth.selectors';

const CancelConfirmModal = (props: {isCancelConfirmModalVisible: boolean, handleCancelConfirmOk: ()=>void, handleCancelConfirmCancel: ()=>void }) =>{
  const asset = useSelector(selectAssetById);
  const user = useSelector(selectUser);
  const goRaffleList = () => {
    window.location.href = `/profile/dashboard`;
  }

  return(
    <Modal closable={false} maskClosable={false} visible={props.isCancelConfirmModalVisible} onOk={props.handleCancelConfirmOk} onCancel={props.handleCancelConfirmCancel} footer={null}>
      <div tw="text-gray-300 text-2xl font-semibold text-center">
        This raffle is canceled!
      </div>
      <div tw="flex justify-center mt-8">
        <img alt="metamask" src={imageConvert(asset.metadata?.image)} tw="w-[167px] h-[167px] rounded-xl shadow-xl"/> 
      </div>
      <div tw="flex justify-center mt-12">
        <button onClick={goRaffleList} tw="text-white bg-[#9C40CF] text-base font-semibold px-12 py-2 rounded border border-transparent hover:border-white">
          View item
        </button>
      </div>
    </Modal>
  )
}

export default CancelConfirmModal;
  