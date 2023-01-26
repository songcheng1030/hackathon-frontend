import { Link } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { navMenu, socialLink } from './Header';

const StyledMenuPanel = styled.div`
  ${tw`px-2 py-4 w-full bg-white rounded-3xl`}
  transform-origin: top left;
  animation: dropdown 0.4s ease-out;

  @keyframes dropdown {
    from {
      transform: scaleY(0);
    }

    to {
      transform: scaleY(1);
    }
  }
`;

const MobileMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      tw="fixed px-4 pt-16 left-0 top-0 w-full h-full bg-[#0002] z-50"
      onClick={() => onClose()}
    >
      <StyledMenuPanel onClick={(e) => e.stopPropagation()}>
        <ul>
          {navMenu.map((item) => (
            <li key={item.title}>
              <a
                href={item.link}
                tw="py-2 block w-full font-bold text-center text-black hover:text-[#7119b4]"
                onClick={() => onClose()}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        <ul tw="py-4 flex gap-2.5 justify-center">
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
      </StyledMenuPanel>
    </div>
  );
};

export default MobileMenu;
