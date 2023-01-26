import 'twin.macro';

import { ReactNode, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import Header from './Header';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/auth/auth.selectors';
import { rafflesService } from '../services';
import { GNotification } from '../types';
import { addressLongestFormat, imageConvert } from '../utils/helpers';
import notification from 'antd/lib/notification';

const Layout = ({
  children,
  menuOpened,
  onToggleMenu,
}: {
  children: ReactNode;
  menuOpened: boolean;
  onToggleMenu: () => void;
}) => {
  const { pathname } = useLocation();
  const user = useSelector(selectUser);

  const openNotification = (item: GNotification) => {
    notification.open({
      message: <div tw="ml-[50px]">{user.account === item.to?"Congratulations! You are the winner of the raffle." : "Winner has been selected."} </div>,
      icon: <img src={`${imageConvert(item.image)}`} tw="w-[80px] h-[80px] rounded-md"/>,
      description: <div tw="ml-[50px]">
        <div tw="flex items-center"><div tw="w-[50px]">Seller </div> : <a tw="ml-2 text-blue-100 text-sm cursor-pointer" target="_blank" href={`https://rinkeby.etherscan.io/address/${item?.from}`}>{addressLongestFormat(item?.from || "")}</a></div> 
        <div tw="flex items-center"><div tw="w-[50px]">Buyer </div> : <a tw="ml-2 text-blue-100 text-sm cursor-pointer" target="_blank" href={`https://rinkeby.etherscan.io/address/${item?.to}`}>{addressLongestFormat(item?.to || "")}</a></div> 
      </div>,
      placement: "topRight",
      style: {height: 120},
      duration: 30
    });
  };

  const notifications = async() => {
    if (user){
      const rafflesSoldRes = await rafflesService.getNotification(user.account); 
      if (rafflesSoldRes){
        rafflesSoldRes.map((item: GNotification)=>{
          openNotification(item);
//           new Notification("NFT SOLD OUT", {
//             body: `Seller: ${item.from} 
// Buyer: ${item.to} `,
//             icon: imageConvert(item.image)
//           });
        })
      }
    }
  }

  useEffect(() => {
    notifications();
    const timer = setInterval(() => notifications(), 3000);
    return () => {
      clearInterval(timer);
    };
  }, [notifications]);

  useEffect(() => {
    Notification.requestPermission(function(result) {
      if (result === 'denied') {
        return;
      }
    })
  }, []);

  return (
    <div tw="relative">
      {pathname != '/' &&
        <Header menuOpened={menuOpened} onToggleMenu={onToggleMenu} />
      }
      {children}
      {/* <Footer menuOpened={menuOpened} onToggleMenu={onToggleMenu} /> */}
    </div>
  );
};

export default Layout;
