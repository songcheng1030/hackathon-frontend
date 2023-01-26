import { Link } from 'react-router-dom';
import tw from 'twin.macro';

import imgLogo from '../assets/images/logo.png';
import iconMenu from '../assets/svgs/sandwich.svg';
import iconClose from '../assets/svgs/times.svg';
import { navMenu, socialLink } from './Header';

const Footer = ({
  menuOpened,
  onToggleMenu,
}: {
  menuOpened: boolean;
  onToggleMenu: () => void;
}) => {
  return (
    <footer tw="w-full bg-[#0f1010]">
      <div tw="px-[5%] w-full h-[72px] flex justify-between items-center">
        <a href="#top">
          <img alt="logo" src={imgLogo} tw="max-w-[202px]" />
        </a>
        <div tw="items-center gap-10 hidden md:flex">
          <ul tw="flex gap-8">
            {navMenu.map((item) => (
              <li key={item.title}>
                <a href={item.link} tw="uppercase text-white hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
          <ul tw="flex gap-2.5">
            {socialLink.map((item) => (
              <li
                key={item.title}
                style={{
                  backgroundImage: 'linear-gradient(225deg, #7e17ba, #36249b)',
                }}
                tw="w-9 h-9 rounded-full hover:border border-white"
              >
                <Link
                  to={item.link}
                  tw="w-full h-full flex justify-center items-center uppercase text-white hover:underline"
                >
                  <img
                    alt={item.title}
                    src={item.icon}
                    tw="object-center"
                    width={20}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="#" tw="block md:hidden" onClick={() => onToggleMenu()}>
          <img alt="menu" src={menuOpened ? iconClose : iconMenu} />
        </Link>
      </div>
      <div tw="pt-4 pb-10 text-sm text-center border-t border-[#765691] bg-[#030104]">
        &copy; 2022 Suit &amp; Tie Club. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
