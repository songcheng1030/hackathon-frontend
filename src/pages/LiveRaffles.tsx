import tw, { styled } from 'twin.macro';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NftCard from '../components/NftCard';
import { Divider, Select, Input } from 'antd';
import { selectRaffles } from "../store/raffles/raffles.selectors";
import { getAllRaffles } from '../store/raffles/raffles.actions';

const StyledPage = styled.div`
  ${tw`w-full bg-[#ffffff]`}
  height: calc(100vh - 110px)
`;

const LiveRaffles = () => {
  const { Option } = Select;

  const dispatch = useDispatch();
  const raffles = useSelector(selectRaffles);

  useEffect(() => {
    dispatch(getAllRaffles());
  }, [dispatch]);


  function handleChange(value: string) {
    console.log(`selected ${value}`);
  }

  return (
    <StyledPage>
      <div tw="mx-auto max-w-6xl px-3 pt-14 pb-32">
        <div tw="flex justify-between items-center mb-10">
          <div tw="text-gray-300 text-3xl font-semibold">Current raffle listings</div>
          {/* <div tw="flex">
            <Select defaultValue="Sort" tw="w-full rounded-lg" onChange={handleChange}>
              <Option value="jack">Sort</Option>
            </Select>
            <Select defaultValue="Filter" tw="w-full rounded-lg ml-2" onChange={handleChange}>
              <Option value="jack">Filter</Option>
            </Select>
          </div> */}
        </div>

        <div tw="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {raffles.length !== 0 && raffles.map((item, index)=>{
            return(<div key={index} tw="text-gray-300"><NftCard raffle={item} state={"buy"}></NftCard></div>)
          })}
        </div>
        {raffles.length === 0 && ( 
          <div tw="flex justify-center mt-20 text-[#818181] text-4xl font-semibold">
            No items to display
          </div>)}
      </div>
    </StyledPage>
  );
};

export default LiveRaffles;
