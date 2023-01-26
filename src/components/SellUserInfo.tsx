import tw from 'twin.macro';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from "../store/auth/auth.selectors";

import copyImg from '../assets/images/icon/copy.png';
import linkVioletImg from '../assets/images/icon/link-violet.png';
import { addressFormat, joinDateFormat } from '../utils/helpers';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {showNotification} from '../utils/helpers';

const SellUserInfo = () => {
  
  const user = useSelector(selectUser);

  const goProfileEdit = () => {
    window.location.href = '/profile/edit';
  }

  const onCopy = () => {  
    showNotification("Copied!", "success", "topRight")
  }

  return (
    <div tw="flex justify-between items-center">
      <div tw="flex items-center">
        <img alt="metamask" src={user?.avatar} tw="w-32 h-32 rounded-full border-4 border-white"/>
        <div tw="mb-6">
          <div tw="flex items-center px-6">
            <div tw="text-2xl font-semibold text-gray-100">{user?.name}</div>
            <div tw="text-white text-xs bg-violet-200 py-0.5 px-2 ml-3 mt-1 rounded-full" style={{height: 'fit-content'}}>LEVEL 8</div>
          </div>
          <div tw="flex items-center px-6 py-0.5"> 
            <a tw="text-base text-violet-200 cursor-pointer" target="_blank" href={`https://rinkeby.etherscan.io/address/${user?.account}`}>{addressFormat(user?.account)}</a>
            <CopyToClipboard text={user?.account}>
              <img alt="metamask" src={copyImg} tw="w-5 h-5 ml-3 mt-1 cursor-pointer" onClick={onCopy}/>
            </CopyToClipboard>
            <div tw="text-gray-600 text-xs ml-3">Joined {joinDateFormat(user?.created)}</div> 
          </div>
        </div>
      </div>
      <div tw="flex justify-center items-center mt-2.5 mb-6">
        <button onClick={goProfileEdit} tw="bg-white text-violet-200 font-semibold text-xs mx-1 py-2 px-5 rounded border border-solid border-violet-200">
          Edit
        </button>
        <button tw="bg-white text-violet-200 text-xs mx-1 p-2 rounded border border-solid border-violet-200">
          <img alt="metamask" src={linkVioletImg} tw="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
};
export default SellUserInfo;
