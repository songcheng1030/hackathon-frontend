import tw from 'twin.macro';

import img1 from '../assets/images/sample/sample_avatar2.png';
import img2 from '../assets/images/icon/copy.png';
import group from '../assets/images/icon/group.svg';

const SellUserInfo_1 = () => {
  return (
    <div>
      <div tw="flex justify-center items-center">
        <img alt="metamask" src={img1} tw="w-32 h-32 rounded-full border-4 border-white"/>
      </div>
      <div tw="flex justify-center items-center mt-2">
        <div tw="text-2xl font-semibold text-gray-100">Leyla Gul</div>
        <div tw="text-white ml-3 text-xs bg-violet-200 py-0.5 px-2 mt-1 rounded-full" style={{height: 'fit-content'}}>LEVEL 8</div>
      </div>
      <div tw="flex justify-center mt-3">
        <div tw="flex items-center rounded-full bg-[#FBF8FB] px-6 py-0.5"> 
          <div tw="text-base text-violet-200">0x25...94AF</div>
          <img alt="metamask" src={img2} tw="w-5 h-5 ml-3 mt-1"/>
        </div>
      </div>
      <div tw="flex justify-center items-center mt-3">
        <div tw="text-gray-600 text-xs">Joined 12 May · 2022</div>  
      </div>  
      <div tw="flex justify-center items-center mt-2.5">
        <button tw="bg-white text-gray-100 text-xs mx-1 py-2 px-5 rounded border border-solid">
          Edit
        </button>
        <button tw="bg-white text-gray-100 text-xs mx-1 p-2 rounded border border-solid">
          <img alt="metamask" src={group} tw="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
};
export default SellUserInfo_1;
