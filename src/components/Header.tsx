import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar'

import { logout, login } from '../store/auth/auth.actions';
import { selectUser } from "../store/auth/auth.selectors";

import SettingModal from './Modal/SettingModal'

import imgLogo from '../assets/images/logo/logo.svg';
import imgBeta from '../assets/images/logo/logo-beta.png';
import iconDiscord from '../assets/svgs/icon-discord.svg';
import iconInstagram from '../assets/svgs/icon-instagram.svg';
import iconOpenSea from '../assets/svgs/icon-opensea.svg';
import iconTwitter from '../assets/svgs/icon-twitter.svg';
import iconMenu from '../assets/svgs/sandwich.svg';
import iconClose from '../assets/svgs/times.svg';

import avatar from '../assets/images/icon/avatar.png';
import connectIcon from '../assets/images/icon/connect.png';

export const navMenu = [
  { link: '#about', title: 'About' },
  { link: '#roadmap', title: 'Roadmap' },
  { link: '#team', title: 'Team' },
];

export const socialLink = [
  { icon: iconOpenSea, link: '/', title: 'OpenSea' },
  { icon: iconInstagram, link: '/', title: 'Instagram' },
  { icon: iconTwitter, link: '/', title: 'Twitter' },
  { icon: iconDiscord, link: '/', title: 'Discord' },
];

const Header = ({ menuOpened, onToggleMenu,}: {
  menuOpened: boolean;
  onToggleMenu: () => void;
}) => {
  
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // useEffect(() => {
  //   if (wallet) dispatch(login(wallet?.address));
  // }, [wallet])

  const user = useSelector(selectUser);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const signOut = () => {
    logout(dispatch);
  }

  const goBanner = () => {
    window.location.href = '/buy/raffles';
  }

  return (
    <>
     
      <header tw="w-full sticky top-0 bg-[#FBF8FB] z-30">
        <LoadingBar />
        <div tw="px-[5%] w-full h-[110px] flex justify-between items-center">
          <div tw="flex items-center cursor-pointer">
            <img alt="logo" onClick={goBanner} src={imgLogo} tw="w-[114px]"/>
            <img alt="logo" src={imgBeta} tw="w-[33px] h-[14px] ml-1"/>
          </div>
          <div tw="items-center gap-10 hidden md:flex">
            {/* <ul tw="flex gap-8">
              {navMenu.map((item) => (
                <li key={item.title}>
                  <a href={item.link} tw="uppercase text-white hover:underline">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul> */}
            <ul tw="flex gap-2.5 cursor-pointer">
              {user._id?(user.avatar?(<img alt="avatar" onClick={showModal} src={user.avatar} tw="w-[36px] h-[36px] rounded-full"/>)
                :(<img alt="avatar" src={avatar} tw="w-[36px] h-[36px] rounded-full"/>))
                :(<></>)
              }
              <SettingModal isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}></SettingModal>
            </ul>
          </div>
          <Link to="#" tw="block md:hidden" onClick={() => onToggleMenu()}>
            <img alt="menu" src={menuOpened ? iconClose : iconMenu} />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
 