import tw, { styled } from 'twin.macro';
import SellNftCard from '../components/SellNftCard';
import NftCard from '../components/NftCard';
import SellUserInfo_1 from '../components/SellUserInfo_1';
import { Tabs } from 'antd';

const StyledPage = styled.div`
  ${tw`w-full`}
  height: calc(100vh - 110px);
  background: linear-gradient(180deg, #FBF8FB 100px, #FFFFFF 100px) !important;
`;
const { TabPane } = Tabs;

const SellDashboard_1 = () => {
  const count = 8;
  const temp = [{
    id: 1,
    image:'../assets/images/3.jpg',
    time: '12h 30m',
    eth: 0.3,
    price: 30,
    progress: 88,
  },{
    id: 2,
    image:'../assets/images/3.jpg',
    time: '12h 30m',
    eth: 0.3,
    price: 30,
    progress: 88,
  },{
    id: 3,
    image:'../assets/images/3.jpg',
    time: '12h 30m',
    eth: 0.3,
    price: 30,
    progress: 88,
  },{
    id: 4,
    image:'../assets/images/3.jpg',
    time: '12h 30m',
    eth: 0.3,
    price: 30,
    progress: 88,
  }];

  const callback=(key: string)=>{
    console.log(key);
  }
  const collectedNumber = 10;
  return (
    <StyledPage>
      <div tw="mx-auto max-w-screen-2xl px-3">
        <SellUserInfo_1></SellUserInfo_1>
      </div>
      {/* <div tw="mx-auto max-w-6xl px-3 pt-14">
        <Tabs type="line" centered>
          <TabPane tab={`Collected ${count}`} key="1">
            <div tw="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {temp.map(item=>{
                return(<div key={item.id} tw="text-gray-300"><SellNftCard nft={item}></SellNftCard></div>)
              })}
            </div>
          </TabPane>
          <TabPane tab="Listed" key="2">
            <div tw="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {temp.map(item=>{
                return(<div key={item.id} tw="text-gray-300"><NftCard nft={item}></NftCard></div>)
              })}
            </div>
          </TabPane>
          <TabPane tab="Sold" key="3">
            <div tw="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {temp.map(item=>{
                return(<div key={item.id} tw="text-gray-300"><SellNftCard nft={item}></SellNftCard></div>)
              })}
            </div>
          </TabPane>
        </Tabs>
      </div> */}
    </StyledPage>
  );
};

export default SellDashboard_1;
