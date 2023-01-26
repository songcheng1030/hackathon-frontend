import tw from 'twin.macro';
import { useState, useEffect } from 'react';
import { Divider, Select, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GTicket } from '../types';
import { selectEthPrice } from '../store/ethPrice/ethPrice.selectors';
import ethSmall from '../assets/images/icon/eth-small.png';
import tooltip from '../assets/images/icon/tooltip.png';
import SellRaffleComponentModal from './Modal/SellRaffleComponentModal'
import raffle from '../assets/images/icon/raffle.png';
import dollar from '../assets/images/icon/dollar.png';
import hummer from '../assets/images/icon/hummer.png';
import { formattedNumberWithoutZeroDecimal, showNotification } from '../utils/helpers';
import BigNumber from 'bignumber.js';

const SellRaffleInfo = (props:{address: string, tokenId: number}) => {
  const { Option } = Select;
  const total1 = 10;
  const total2 = 100;
  const total3 = 1000;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectType, setSelectType] = useState('raffle');
  const [selectNumber, setSelectNumber] = useState(10);
  const [duration, setDuration] = useState(1);
  const [amount, setAmount] = useState(0);
  const [ticket, setTicket] = useState<GTicket>({
    type: "",
    typeId: 0,
    totalPrice: 0,
    quantity: 0,
    perPrice: "0",
    duration: 0,
  });

  const price = useSelector(selectEthPrice);

  const onTicketSell = () => {
    if (amount <= 0 ) {
      showNotification('Please input ticket total value again.', 'error');
      return
    }
    setTicket({
      type: selectType,
      typeId: selectNumber==10?0:selectNumber==100?1:2,
      totalPrice: amount,
      quantity: selectNumber, 
      perPrice: getPricePerTicket(selectNumber).toString(),
      duration: duration
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
 
  const onSeletType = (key: string) => {
    setSelectType(key);
  }

  const onSeletNumber = (key: number) => {
    setSelectNumber(key);
  }

  const getPricePerTicket = (number: number): BigNumber => {
    return (new BigNumber(amount).dividedBy(new BigNumber(number)));
  }

  const onChangeAmount = (value: string) => {
    setAmount(Number(value));
  }
  
  const onSetDuration = (e: string) => {
    setDuration(Number(e));
  }
  return (
    <div>
      <div tw="font-semibold text-2xl text-gray-300">List item for sale</div>
      <div tw="flex justify-between items-center mb-1 mt-5">
        <div tw="font-semibold text-base">Type</div>
        <img alt="metamask" src={tooltip} tw="w-4 h-4 cursor-pointer"/>
      </div>
      <div tw="border-solid border border-zinc-300 rounded-lg w-full">   
        <div tw="grid grid-cols-3">
          <div style={selectType=='raffle'?{background:'#FBF8FB'}:{}} tw="border-solid border-r rounded-l-lg pt-4 pb-3 hover:bg-zinc-100 cursor-pointer">
            <div tw="flex justify-center mb-2">
              <img alt="raffle" src={raffle} tw="w-[22px] lg:w-7 lg:h-7"/>
            </div>
            <div tw="flex justify-center">
              <div tw="text-gray-800 text-center text-xs lg:text-base">Raffle</div>
            </div>
          </div>
          <div style={selectType=='fixprice'?{background:'#FBF8FB'}:{}} tw="border-solid border-r py-4 hover:bg-zinc-100 cursor-pointer">
            <div tw="flex justify-center mb-2">
              <img alt="dollar" src={dollar} tw="w-[12px] lg:w-4"/>
            </div>
            <div tw="flex justify-center">
              <div tw="text-gray-800 text-center text-xs lg:text-base">Fixed price</div>
            </div>
          </div>
          <div style={selectType=='auction'?{background:'#FBF8FB'}:{}} tw="py-4 rounded-r-lg hover:bg-zinc-100 cursor-pointer">
            <div tw="flex justify-center mb-2">
              <img alt="hummer" src={hummer} tw="w-[22px] lg:w-8"/>
            </div>
            <div tw="flex justify-center">
              <div tw="text-gray-800 text-center text-xs lg:text-base">Auction</div>
            </div>
          </div>
        </div>
      </div>

      <div tw="flex justify-between items-center mb-1 mt-10">
        <div tw="font-semibold text-base">Price</div>
        <div tw="text-xs text-gray-900">${(new BigNumber(amount).multipliedBy(new BigNumber(price))).toFixed(2).toLocaleString()} total</div>
      </div>

      <div tw="flex justify-between items-center">
        {/* <Select defaultValue="lucy" tw="w-48 mr-2 rounded-lg" onChange={handleChange}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select> */}
        <div tw="flex items-center justify-center border-solid border border-zinc-300 rounded-lg px-6 py-0.5 mr-2">
          <img alt="metamask" src={ethSmall} tw="w-[10px] h-[16px] mr-3"/>
          <div>ETH</div>
        </div>
        <InputNumber type="number" tw="w-full" min="0" step ="any" onChange={onChangeAmount} stringMode/>
      </div>
    
      <div tw="flex justify-between items-center mb-1 mt-10">
        <div tw="font-semibold text-base">Ticket quantity</div>
        <img alt="metamask" src={tooltip} tw="w-4 h-4 cursor-pointer"/>
      </div>
      <div tw="grid grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 border-solid border border-zinc-300 rounded-lg w-full">
        <div onClick={()=>onSeletNumber(10)} style={selectNumber==10?{background:'#FBF8FB'}:{}} tw="border-solid border-b rounded-t-lg lg:rounded-t-none lg:rounded-l-lg lg:border-r lg:border-b-0 py-4 hover:bg-zinc-100 cursor-pointer">
          <div tw="text-gray-300 text-center text-[22px] lg:text-2xl font-semibold">{total1.toLocaleString()}</div>
          <div tw="flex justify-center items-center">
            <img alt="metamask" src={ethSmall} tw="w-[10px] lg:w-[12px] mb-1"/>
            <div tw="text-gray-800 text-center text-xs lg:text-base ml-2">{formattedNumberWithoutZeroDecimal(getPricePerTicket(10).toFixed(15))} per ticket</div>
          </div>
        </div>
        <div onClick={()=>onSeletNumber(100)} style={selectNumber==100?{background:'#FBF8FB'}:{}} tw="border-solid border-b lg:border-r lg:border-b-0 py-4 hover:bg-zinc-100 cursor-pointer">
          <div tw="text-gray-300 text-center text-[22px] lg:text-2xl font-semibold">{total2.toLocaleString()}</div>
          <div tw="flex justify-center items-center">
            <img alt="metamask" src={ethSmall} tw="w-[10px] lg:w-[12px] mb-1"/>
            <div tw="text-gray-800 text-center text-xs lg:text-base ml-2">{formattedNumberWithoutZeroDecimal(getPricePerTicket(100).toFixed(14))} per ticket</div>
          </div>
        </div>
        <div onClick={()=>onSeletNumber(1000)} style={selectNumber==1000?{background:'#FBF8FB'}:{}} tw="py-4 hover:bg-zinc-100 cursor-pointer rounded-b-lg lg:rounded-b-none lg:rounded-r-lg">
          <div tw="text-gray-300 text-center text-[22px] lg:text-2xl font-semibold">{total3.toLocaleString()}</div>
          <div tw="flex justify-center items-center">
            <img alt="metamask" src={ethSmall} tw="w-[10px] lg:w-[12px] mb-1"/>
            <div tw="text-gray-800 text-center text-xs lg:text-base ml-2">{formattedNumberWithoutZeroDecimal(getPricePerTicket(1000).toFixed(14))} per ticket</div>
          </div>
        </div>
      </div>
      <div tw="flex justify-between items-center mb-1 mt-10">
        <div tw="font-semibold text-base">Duration</div>
        <img alt="metamask" src={tooltip} tw="w-4 h-4 cursor-pointer"/>
      </div>
      <Select defaultValue="1" tw="w-full rounded-lg" onChange={(e)=>onSetDuration(e)}>
        <Option value="1">1 day</Option>
        <Option value="7">1 week</Option>
        <Option value="30">1 month</Option>
      </Select>
      <Divider />
      <div tw="flex items-center mb-1 mt-2">
        <div tw="text-base text-gray-300 mr-3">Fees</div>
        <img alt="metamask" color="text-gray-300" src={tooltip} tw="w-4 h-4"/>
      </div>
      <div tw="flex justify-between items-center mb-1 mt-2">
        <div tw="text-base text-gray-800">Goobig fees</div>
        <div tw="text-base text-gray-800">1.5%</div>
      </div>
      <div tw="flex justify-between items-center mb-1 mt-2">
        <div tw="text-base text-gray-800">Creator fees</div>
        <div tw="text-base text-gray-800">5%</div>
      </div>
      <div tw="flex justify-end mt-10">
        <button onClick={onTicketSell} tw="bg-[#9C40CF] w-full lg:w-auto text-white text-base font-semibold px-12 py-2 rounded border border-transparent hover:border-white">
          Complete listing
        </button>
        <SellRaffleComponentModal isModalVisible={isModalVisible} ticket={ticket} handleOk={handleOk} handleCancel={handleCancel}></SellRaffleComponentModal>
      </div>
    </div>
  );
};
export default SellRaffleInfo;





