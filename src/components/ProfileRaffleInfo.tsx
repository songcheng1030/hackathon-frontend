import tw from 'twin.macro';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Modal, Button } from 'antd';
import ProgressBar from '@ramonak/react-progress-bar';
import { useDispatch, useSelector } from 'react-redux';
import { GRaffles } from '../types';
import { getRafflePrice, getEndDate, getPrice } from '../utils/helpers';
import { selectEthPrice } from '../store/ethPrice/ethPrice.selectors';
import BuyPolicyModal from './Modal/BuyPolicyModal';
import BuyRaffleModal from './Modal/BuyRaffleModal';
import BuyConfirmModal from './Modal/BuyConfirmModal';
import CancelRaffleModal from './Modal/CancelRaffleModal';
import CancelConfirmModal from './Modal/CancelConfirmModal';
import showMark from '../assets/images/icon/show-mark.svg';
import warning from '../assets/images/icon/warning.png';
import time from '../assets/images/icon/time.png';
import eth from '../assets/images/icon/eth-icon.svg';
import moment from 'moment';
import { PEDINGDATE } from '../constants/contracts';
import { getRafflesById } from '../store/raffles/raffles.actions';
import { useCancelRaffle, useExcuteRaffle } from '../hooks';

const ProfileRaffleInfo = (props: {raffle: GRaffles, raffleId: string}) => {
  const dispatch = useDispatch();

  const raffle: GRaffles = props.raffle;
  const price = useSelector(selectEthPrice);

  const { cancelRaffle, isRaffleCanceling, isRaffleCanceled } = useCancelRaffle();
  const { excuteDraw, isExcuteDrawing, isExcuteDrawed } = useExcuteRaffle();
  const [isBuyModalVisible, setBuyModalVisible] = useState(false);
  const [isPolicyModalVisible, setPolicyModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);
  const [closeFlag, setCloseFlag] = useState(false);
  const [isCancelConfirmModalVisible, setCancelConfirmModalVisible] = useState(false);
  const [txHash, setTxHashInfo] = useState();
  const [pendingFlag, setPendingFlag] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<number>(0);
  const [ticketName, setTicketName] = useState<string>("");
  const [presaleDuration, setPresaleDuration] = useState<{
    days: number;
    hours: number;
    mins: number;
    secs: number;
  }>({ days: 0, hours: 0, mins: 0, secs: 0});

  const [pendingDuration, setPendingDuration] = useState<{
    days: number;
    hours: number;
    mins: number;
    secs: number;
  }>({ days: 0, hours: 0, mins: 0, secs: 0});

  const leftDateDetail = useCallback(()=>{
    let pendingDate: number
    if (raffle.raffleState === "1"){
      setPendingFlag(true);
      pendingDate = PEDINGDATE;
    }else{ pendingDate = 0; }

    const endDate = Number(raffle.created) + Number(raffle.duration) + pendingDate*3600*24;
    const currentDate = Number(moment().format("X"));
    const diff = endDate - currentDate;
    let days: number;
    let hours: number;
    let minutes: number;
    let seconde: number;

    if (diff <= 0 && raffle.raffleState === "0"){
      dispatch(getRafflesById(Number(props.raffleId)));
    }

    if ( diff <= 0 ){ 
      days = 0; hours = 0; minutes = 0; seconde = 0;
    }else{
      days = Math.floor(diff/3600/24);
      hours = Math.floor((diff/3600) % 24);
      minutes = Math.floor((diff % 3600)/60);
      seconde = (diff % 3600)%60;
    }

    let timer = { 
      days: days,
      hours: hours,
      mins: minutes,
      secs: seconde
    }

    if (raffle.raffleState === "1"){
      setPendingDuration(timer) 
    }else{ setPresaleDuration(timer)}
   
    if (raffle.soldTickets === raffle.totalTickets){
      console.log('this is raffleState', raffle.raffleState )
      if (raffle.raffleState === "3"){
        setCloseFlag(true);
      }else{ 
        dispatch(getRafflesById(Number(props.raffleId)));
        setCloseFlag(false)
      };
    }

  },[raffle, dispatch])


  useEffect(() => {
    leftDateDetail();
    const timer = setInterval(() => leftDateDetail(), 1000);
    return () => {
      clearInterval(timer);
    };
  }, [leftDateDetail]);

  const onBuyTicket = () => {
    setPolicyModalVisible(true);
  };

  const onCancelRaffle = () => {
    setCancelModalVisible(true);
  }

  const onExcuteRaffle = () => {
    excuteDraw(raffle.raffleId);
  }
  
  const handlePolicyOk = () => {
    setPolicyModalVisible(false);
    setBuyModalVisible(true);
  };

  const handlePolicyCancel = () => {
    setPolicyModalVisible(false);
  };

  const handleBuyOk = (txHashInfo: any, count: number, name: string):void => {
    setTxHashInfo(txHashInfo);
    setTicketNumber(count);
    setTicketName(name);
    setConfirmModalVisible(true);
    setBuyModalVisible(false);
  };

  const handleBuyCancel = () => {
    setBuyModalVisible(false);
  };

  const handleConfirmOk = () => {
    setConfirmModalVisible(false);
  };

  const handleConfirmCancel = () => {
    setConfirmModalVisible(false);
  };

  const handleCancelOk = () => {
    setCancelConfirmModalVisible(true);
    setCancelModalVisible(false);
  };

  const handleCancel = () => {
    setCancelModalVisible(false);
  };

  const handleCancelConfirmOk = () => {
    setCancelConfirmModalVisible(false);
  };

  const handleCancelConfirmCancel = () => {
    setCancelConfirmModalVisible(false);
  };

  const onBuyFlag = (): boolean => {
    if (raffle.soldTickets === raffle.totalTickets) {
      return false;
    }
    return true;
  }

  const raffleBuyState = useMemo(() => {
    return (
      <div tw="grid grid-cols-1">
        <div tw="border-solid border-t px-5 py-4">
          <div tw="lg:flex items-center justify-between"> 
            <div>
              <div tw="flex items-center justify-center lg:justify-start">
                <img alt="metamask" src={time} tw="w-[20px] h-[20px] mr-1"/>
                <div tw="text-gray-800 text-center text-xs lg:text-base text-left">Raffle ends {getEndDate(Number(raffle.created), Number(raffle.duration))}</div>
              </div>
              <div tw="flex items-baseline mt-2 justify-center lg:justify-start">
                {presaleDuration.days !== 0 && (
                  <>
                    <div tw="text-gray-300 text-center text-xl font-semibold lg:pl-7 pr-2 w-[30px] lg:w-[60px]">{presaleDuration.days}</div>
                    <div tw="text-gray-800 text-center text-xs lg:text-base">Days</div>
                  </>
                )}
                <div tw="text-gray-300 text-center text-xl font-semibold lg:pl-7 pr-2 w-[30px] lg:w-[60px]">{presaleDuration.hours}</div>
                <div tw="text-gray-800 text-center text-xs lg:text-base">Hours</div>
                <div tw="text-gray-300 text-center text-xl font-semibold lg:pl-7 pr-2 w-[30px] lg:w-[60px]">{presaleDuration?.mins}</div>
                <div tw="text-gray-800 text-center text-xs lg:text-base">Minutes</div>
                {presaleDuration.days === 0 && (
                  <>
                    <div tw="text-gray-300 text-center text-xl font-semibold lg:pl-7 pr-2 w-[30px] lg:w-[60px]">{presaleDuration?.secs}</div>
                    <div tw="text-gray-800 text-center text-xs lg:text-base">Seconds</div>
                  </>
                )}
              </div>
            </div>
            <div>
              {onBuyFlag()?(
                <button onClick={onBuyTicket} tw="bg-[#9C40CF] w-full lg:w-auto mt-3 text-white text-base font-semibold px-12 py-2 rounded border border-transparent hover:border-white">
                  Buy tickets
                </button>
              ):(
                <button tw="text-[#C1A3C1] bg-[#D6C1D6] text-base font-semibold px-12 py-2 rounded border border-[#C1A3C1] hover:border-white">
                  Sold out
                </button>
              )}
              
              <BuyConfirmModal isConfirmModalVisible={isConfirmModalVisible} txHash={txHash} ticketNumber={ticketNumber} handleConfirmOk={handleConfirmOk} ticketName={ticketName} handleConfirmCancel={handleConfirmCancel}></BuyConfirmModal>
              <BuyRaffleModal isBuyModalVisible={isBuyModalVisible} handleBuyOk={(txHash, ticketNumber, name)=>handleBuyOk(txHash, ticketNumber, name)} handleBuyCancel={handleBuyCancel}></BuyRaffleModal>
              <BuyPolicyModal isPolicyModalVisible={isPolicyModalVisible} handlePolicyOk={handlePolicyOk} handlePolicyCancel={handlePolicyCancel}></BuyPolicyModal>
            </div>  
          </div>
        </div>
      </div>
    );
  }, [presaleDuration]);

  const rafflePendingState = useMemo(() => {
    return (
      <div tw="grid grid-cols-1">
        <div tw="border-solid border-t px-5 py-5">
          <div> 
            <div tw="lg:grid lg:grid-cols-2 lg:gap-4">
              <div tw="flex items-start justify-center lg:justify-start">
                <img alt="metamask" src={warning} tw="w-[28px] h-[24px] mr-1"/>
                <div tw="text-gray-800 text-center text-xs lg:text-base text-left">Raffle ended - please select one of the <span tw="font-bold">three</span> options below within <span tw="font-bold">7 days</span></div>
              </div>
              <div tw="flex justify-between items-baseline lg:mt-0 mt-3">
                <div>
                  <div tw="text-gray-300 text-center text-xl font-semibold">{pendingDuration.days}</div>
                  <div tw="text-gray-800 text-center text-xs lg:text-base">Days</div>
                </div>
                <div>
                  <div tw="text-gray-300 text-center text-xl font-semibold">{pendingDuration.hours}</div>
                  <div tw="text-gray-800 text-center text-xs lg:text-base">Hours</div>
                </div>
                <div>
                  <div tw="text-gray-300 text-center text-xl font-semibold">{pendingDuration?.mins}</div>
                  <div tw="text-gray-800 text-center text-xs lg:text-base">Minutes</div>
                </div>
                <div>
                  <div tw="text-gray-300 text-center text-xl font-semibold">{pendingDuration?.secs}</div>
                  <div tw="text-gray-800 text-center text-xs lg:text-base">Seconds</div>
                </div>
              </div>
            </div>
            <div tw="flex justify-between items-center mt-5">
              <button tw="bg-[#9C40CF] w-full lg:w-auto text-white text-base font-semibold px-14 py-2 rounded border border-transparent">
                Extend draw
              </button>
              {raffle.soldTickets !== "0"? (
                <button onClick={onExcuteRaffle} tw="text-[#A042D2] bg-[#FBF8FB] text-base font-semibold px-14 py-2 rounded border border-[#A042D2]">
                  Execute draw
                </button>  
              ):(
                <button tw="text-[#C1A3C1] bg-[#D6C1D6] text-base font-semibold px-12 py-2 rounded border border-[#C1A3C1] hover:border-white">
                  Execute draw
                </button>
              )}
              <div onClick={onCancelRaffle} tw="text-[#A042D2] font-semibold text-base underline cursor-pointer">Cancel draw</div>
            </div>  
            <CancelConfirmModal isCancelConfirmModalVisible={isCancelConfirmModalVisible} handleCancelConfirmOk={handleCancelConfirmOk} handleCancelConfirmCancel={handleCancelConfirmCancel}></CancelConfirmModal>
            <CancelRaffleModal isCancelModalVisible={isCancelModalVisible} handleCancelOk={handleCancelOk} handleCancel={handleCancel}></CancelRaffleModal>
          </div>
        </div>
      </div>
    );
  }, [raffle.raffleState, pendingDuration]);

  return (
    <div tw="border-solid border border-zinc-300 rounded-lg w-full">   
      <div tw="grid grid-cols-3">
        <div tw="border-solid border-r py-3 rounded-tl-lg bg-zinc-100" >
          <div tw="text-gray-800 text-center text-xs lg:text-base mb-2">Total tickets</div>
          <div tw="text-gray-300 text-center text-xl lg:text-3xl font-semibold">{raffle.totalTickets}</div>
        </div>
        <div tw="border-solid border-r py-3">
          <div tw="text-gray-800 text-center text-xs lg:text-base mb-2">Ticket price</div>
          <div tw="flex justify-center items-baseline">
            <img alt="metamask" src={eth} tw="w-[14px] mr-2"/>
            <div tw="text-gray-300 text-center text-xl lg:text-3xl font-semibold">{getRafflePrice(Number(raffle.ticketPrice))}</div>
            <div tw="text-gray-800 text-center text-sm ml-2 hidden lg:block">(${getPrice(Number(raffle.ticketPrice), price)})</div>
          </div>
        </div>
        <div tw="py-3">
          <div tw="text-gray-800 text-center text-xs lg:text-base mb-2">Total price</div>
          <div tw="flex justify-center items-baseline">
            <img alt="metamask" src={eth} tw="w-[14px] mr-2"/>
            <div tw="text-gray-300 text-center text-xl lg:text-3xl font-semibold">{getRafflePrice(Number(raffle.totalPrice))}</div>
            <div tw="text-gray-800 text-center text-sm ml-2 hidden lg:block">(${getPrice(Number(raffle.totalPrice), price)})</div>
          </div>
        </div>
      </div>
      <div tw="bg-zinc-100">
        <div tw="border-solid border-t px-4 pt-6 pb-5">
          {!onBuyFlag()?(
            !closeFlag?(
              <>
                <div tw="flex justify-between mb-2">
                  <div tw="text-zinc-400 text-xs lg:text-base">Raffle in progress...</div>
                  <div tw="text-gray-400 font-semibold text-xs lg:text-base">selecting winner</div>
                </div>
                <div tw="relative w-full bg-gray-200 rounded">
                  <div tw="w-full top-0 h-[13px] rounded-full" className="shim-red"></div>
                </div>
              </>
            ):(
              <div>
                <div tw="flex justify-between mb-2">
                  <div tw="text-zinc-400 text-xs lg:text-base"></div>
                  <div tw="text-gray-400 text-xs lg:text-base">Winner selected</div>
                </div>
                <ProgressBar completed={Number(raffle.totalTickets)} isLabelVisible={false} maxCompleted={Number(raffle.totalTickets)} height="13px" bgColor="linear-gradient(90deg, #68229D 0%, #A042D2 100%)"  />
              </div>)   
          ):(
            <Progress label={'Remaining tickets'} value={Number(raffle.soldTickets)} total={Number(raffle.totalTickets)}></Progress>
          )}
        </div>
      </div>
      {pendingFlag? rafflePendingState : raffleBuyState}
    </div>
  );
};
export default ProfileRaffleInfo;

export const Progress = (props: {label: string, value: number, total: number})=>{
  return(
    <div>
      <div tw="flex justify-between mb-2">
        <div tw="text-zinc-400 text-xs lg:text-base">{props.label}</div>
        <div tw="text-gray-400 text-xs lg:text-base">{props.value}/{props.total}</div>
      </div>
      <ProgressBar completed={props.value} isLabelVisible={false} maxCompleted={props.total} height="13px" bgColor="linear-gradient(90deg, #68229D 0%, #A042D2 100%)"  />
    </div>
  )
}




