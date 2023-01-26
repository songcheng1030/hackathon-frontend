import tw from 'twin.macro';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseEther } from 'ethers/lib/utils';
import { Modal, Button, InputNumber } from 'antd';
import img1 from '../../assets/images/icon/nftSample.svg';
import checkMarkBlue from '../../assets/images/icon/check-mark-blue.svg';
import minuseButton from '../../assets/images/icon/minuse_button.svg'
import plusButton from '../../assets/images/icon/plus_button.svg'
import eth from '../../assets/images/icon/eth-icon.svg';
import { selectRaffleById, selectNftByTokenId } from "../../store/raffles/raffles.selectors";
import { selectEthPrice } from "../../store/ethPrice/ethPrice.selectors";
import { getRafflePrice, getPrice, addressFormat, imageConvert } from '../../utils/helpers';
import { useBuy } from '../../hooks';
import { getRafflesById } from '../../store/raffles/raffles.actions';
import { SpinnerCircularFixed } from 'spinners-react';

const BuyRaffleModal = (props: {isBuyModalVisible: boolean, handleBuyOk: (txHashInfo: any, count: number, name: string)=>void, handleBuyCancel: ()=>void }) =>{
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const { buy, isBuying, isBuyed, txHashInfo } = useBuy();

  const raffle = useSelector(selectRaffleById);
  const nft = useSelector(selectNftByTokenId);
  const price = useSelector(selectEthPrice);
  
  useEffect(() => {
    if (props.isBuyModalVisible){
      if (isBuyed) {
        dispatch(getRafflesById(Number(raffle.raffleId)));
        setCount(1);
        props.handleBuyOk(txHashInfo, count, nft.metadata?.name?nft.metadata?.name:nft.title);
      }
    }
  }, [isBuying, isBuyed, txHashInfo, props.isBuyModalVisible]);

  const onCountPlus = () => {
    const remainTickets = Number(raffle.totalTickets) - Number(raffle.soldTickets);
    if (count >= remainTickets) 
      { setCount(count);} 
      else {setCount(count + 1);}
  }

  const onCountMinuse = () => {
    if (count <= 1) 
      { setCount(count)} 
      else {setCount(count - 1)};
  }

  const onBuyOk = () => {
    const price = Number(raffle.ticketPrice) * count;
    let buyData = {
      buyTickets: getRafflePrice(price),
      raffleId: Number(raffle.raffleId),
      tickets: count,
    }
    buy(buyData);
  }

  const onChangeAmount = (value: string) => {
    const remainTickets = Number(raffle.totalTickets) - Number(raffle.soldTickets);
    if (Number(value) >= remainTickets) 
      { setCount(remainTickets)} 
      else {setCount(Number(value));}
    
  }

  return(
    <Modal closable={!isBuying} maskClosable={false} visible={props.isBuyModalVisible} onCancel={props.handleBuyCancel} footer={null} width={620}>
      <div tw="text-gray-300 text-2xl font-semibold text-center">
        Buy raffle tickets
      </div>
      <div tw="flex items-center mt-3 relative">
        <img alt="metamask" src={imageConvert(nft.metadata?.image)} tw="w-[72px] h-[72px] rounded-[12px]"/>
        {/* <div tw="absolute top-8 left-[60px]"><img alt="metamask" src={img1} tw="w-6 h-6 rounded-full"/></div> */}
        <div tw="mr-4 ml-5">
          <div tw="text-base font-semibold text-gray-300">{nft.title}</div>
          <div tw="flex">
            <div tw="flex items-center">
              <div tw="text-gray-50 text-sm">Collection:</div>
              <img alt="metamask" src={checkMarkBlue} tw="w-3 h-3 mx-1.5"/>
              <div tw="text-blue-100 pr-1.5 text-sm">{nft.metadata?.name?nft.metadata?.name:nft.title}</div>  
            </div>  
            <div tw="text-gray-50 px-3">·</div>
            <div tw="flex items-center">
              <div tw="text-gray-50 text-sm mr-1.5">Owned by:</div>
              <a tw="text-blue-100 pr-1.5 text-sm cursor-pointer" target="_blank" href={`https://rinkeby.etherscan.io/address/${nft?.owneraccount}`}>{nft?.owner?.name?nft?.owner?.name:addressFormat(nft?.owneraccount)}</a>  
            </div>
          </div>
        </div>        
      </div>
      <div tw="grid grid-cols-3 mt-8">
        <div>
          <div tw="text-gray-800 text-center text-base mb-1">Ticket price</div>
          <div tw="flex justify-center items-baseline">
            <img alt="metamask" src={eth} tw="w-4 h-4 mr-1"/>
            <div tw="text-gray-300 text-center text-[22px] font-semibold">{getRafflePrice(Number(raffle.ticketPrice))}</div>
            <div tw="text-gray-800 text-center text-sm ml-2">(${getPrice(Number(raffle.ticketPrice), price)})</div>
          </div>
        </div>
        <div>
          <div tw="text-gray-800 text-center text-base mb-1">Quantity</div>
          <div tw="flex justify-between items-center px-7" className="quantity">
            <img alt="metamask" onClick={onCountMinuse} src={minuseButton} tw="w-5 h-5 border border-transparent cursor-pointer hover:border-white"/>
            {/* <div tw="text-gray-300 text-center text-[22px] font-semibold">{count}</div> */}
            <InputNumber style={{textAlign: "center"}} controls={false} type="number" tw="text-center text-gray-300 text-[22px] font-semibold w-20" min="1" step ="any" value={count.toString()} onChange={onChangeAmount} stringMode/>
            <img alt="metamask" onClick={onCountPlus} src={plusButton} tw="w-5 h-5 border border-transparent cursor-pointer hover:border-white"/>
          </div>
          {/* {(Number(raffle.totalTickets) - Number(raffle.soldTickets)<count)?(
            <div tw="text-gray-800 text-center text-xs mb-1">Quantity</div>
          ):(<div></div>)} */}
          
        </div>
        
        <div>
          <div tw="text-gray-800 text-center text-base mb-1">Total</div>
          <div tw="flex justify-center items-baseline">
            <img alt="metamask" src={eth} tw="w-4 h-4 mr-1 cursor-pointer"/>
            <div tw="text-gray-300 text-center text-[22px] font-semibold">{getRafflePrice(Number(raffle.ticketPrice) * count)}</div>
            <div tw="text-gray-800 text-center text-sm ml-2">(${getPrice(Number(raffle.ticketPrice) * count, price)})</div>
          </div>
        </div>
      </div>
      <div tw="flex justify-center mt-10">
        {!isBuying?(
          <button onClick={onBuyOk} tw="text-white bg-[#9C40CF] text-base font-semibold px-12 py-2 rounded border border-transparent hover:border-white">
            Buy tickets
          </button>
        ):(
          <button disabled={isBuying} tw="flex items-center text-[#C1A3C1] bg-[#D6C1D6] text-base font-semibold px-6 py-2 rounded border border-[#C1A3C1] hover:border-white">
            <SpinnerCircularFixed size={25} thickness={100} color="#9C40CF" tw="mr-2"/> Buy tickets
          </button>
        )}
      </div>  
    </Modal>
  )
}

export default BuyRaffleModal;
  