import tw from 'twin.macro';
import { useEffect, useState } from 'react';

import { Modal, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification, getRafflePrice, addressFormat, getPrice, addressLongFormat } from '../../utils/helpers';
import { selectUser } from "../../store/auth/auth.selectors";
import { Divider, Select, Input } from 'antd';

import ethIcon from '../../assets/images/icon/eth-small.png';
import imgMetaMask from '../../assets/images/icon/metamask.png';
import imgCoinBase from '../../assets/images/icon/coinbase.png';
import imgWallet from '../../assets/images/icon/walletconnet.png';
import checkPink from '../../assets/images/icon/check-pink.svg';
import { useNetworkConnector } from '../../hooks/useNetworkConnector';
import { getNetworkLibrary } from '../../utils';
import BigNumber from 'bignumber.js';
import { getEthPrice } from '../../store/ethPrice/ethPrice.actions';
import { selectEthPrice } from '../../store/ethPrice/ethPrice.selectors';

const SettingModal = (props: {isModalVisible: boolean, handleOk: ()=>void, handleCancel: ()=>void }) =>{
  const dispatch = useDispatch();
  const { Option } = Select;

  const [selectWallet, setSelectWallet] = useState<string>("metamask");
  const [balance, setBalance] = useState(0);
  const network = useNetworkConnector();
  const networkLibrary = getNetworkLibrary(network);
  const user = useSelector(selectUser);
  const price = useSelector(selectEthPrice);
  useEffect(() => {
    networkLibrary.getBalance(user.account).then(res => setBalance(new BigNumber(res.toString()).shiftedBy(-18).toNumber()));
    dispatch(getEthPrice());
  }, [user])

  const handleChange = (value: string) => {
    setSelectWallet(value)
  }

  const goProfileDashboard = () => {
    window.location.href = `/profile/dashboard`;
  }
  
  const goProfileEdit = () => {
    window.location.href = '/profile/edit';
  }
  
  const onDisconnet = async() => {
    showNotification('Wallet Disconnected.');
    localStorage.clear();
    window.location.href = '/wallet';
    // disconnectWallet();
    // disconnectWallet();
    // showNotification('Wallet Disconnected.');
    // localStorage.clear();
  }
  const ethValue = 1069.08;

  return(
    <Modal tw="top-5 mr-5" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel} footer={null} width={376}>
      <div tw="flex justify-between items-center mt-6">
        <div tw="flex items-center cursor-pointer">
          <img alt="metamask" src={user.avatar} tw="w-11 h-11 rounded-full border-4 border-white"/>
          <div>
            <div tw="flex items-center pl-2" style={{width: "200px"}}>
              <div tw="text-base font-semibold text-gray-100" style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>{addressLongFormat(user.account)}</div>
            </div>
            <div tw="flex items-center pl-2"> 
              <div tw="text-white text-xs bg-violet-200 py-0.5 px-3 rounded-full" style={{width: 'fit-content'}}>LEVEL 8</div>
            </div>
          </div>
        </div>
      </div>
      <div tw="grid items-center grid-cols-2 gap-2 mt-5 mb-5">
        <button onClick={goProfileDashboard} tw="text-white w-full bg-[#9C40CF] text-[13px] font-semibold py-1 rounded border border-transparent hover:border-white">
          View profile
        </button> 
        <div onClick={goProfileEdit} tw="text-center text-[#A042D2] font-semibold text-[13px] underline cursor-pointer">Edit Profile</div>
      </div>
      <hr></hr>
      <div tw="border-solid border border-zinc-300 rounded-lg mt-6">
        <div tw="border-solid py-4 border-b rounded-t-lg bg-zinc-100">
          <div tw="text-xs font-medium text-gray-800 text-center">Total balance</div>
          <div tw="text-2xl font-semibold text-gray-300 text-center mt-1">$ {(balance*price).toFixed(2)}</div>
        </div>
        <div tw="py-3 px-3 rounded-b-lg">
          <div tw="flex justify-between items-center">
            <div tw="flex items-center">
              <img alt="ethIcon" src={ethIcon} tw="w-6 rounded-full border-4 border-white"/>
              <div tw="ml-3">
                <div tw="text-sm text-gray-100 font-semibold">ETH</div>
                <div tw="text-xs text-gray-500">Ether</div>
              </div>
            </div> 
            <div tw="ml-3">
              <div tw="text-sm text-gray-300 font-semibold text-right">{balance.toFixed(5)}</div>
              <div tw="text-xs text-gray-500 text-right">$ {(balance*price).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
      <div tw="mt-4">
        <button onClick={onDisconnet} tw="w-full bg-white text-violet-200 font-semibold text-[13px] py-2 px-5 rounded border border-solid border-violet-200 mt-3">
          Disconnect
        </button> 
      </div>
    </Modal>
  )
}

export default SettingModal;
  