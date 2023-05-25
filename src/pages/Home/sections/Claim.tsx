import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "config/axios";
import { useGetAccountInfo } from "hooks";
import TimeShow from "components/TimeShow";
import { ReactComponent as Cross } from "assets/svg/cross-circle.svg";
import { ReactComponent as Tick } from "assets/svg/tick-circle.svg";

const days = ["MON", "TUE", "WED", "THR", "FRI", "SAT", "SUN"];
const Claim = () => {
  const { account } = useGetAccountInfo();
  const address = account.address;
  const [tableData, setTableData] = useState([]);
  const [claimData, setClaimData] = useState([]);
  const [xp, setXp] = useState(0);
  const [waitingTime, setwaitingTime] = useState(0);
  useEffect(() => {
    const timerClock = setInterval(() => {
      setwaitingTime(waitingTime - 1);
    }, 1000);
    return () => clearInterval(timerClock);
  }, [waitingTime]);

  const getClaimData = async () => {
    const result = await axios.get("https://ddog.club/api/claim_data/" + address);
    setXp(result.data.xp);
    setClaimData(result.data.status);
  };

  const getTableData = async () => {
    const result: any = await axios.get("https://ddog.club/api/claim");
    setTableData(result.data);
  };

  useEffect(() => {
    getClaimData();
    getTableData();
    setwaitingTime(
      Math.floor(
        (new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1
        ).getTime() -
          new Date().getTime()) /
        1000
      )
    );
  }, []);
  const handleClaim = async () => {
    if (!account.address) {
      toast.warn('Please connect your wallet first!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    if (claimData[6]) return;
    const result: any = await axios.post("https://ddog.club/api/claim", { address });
    if (result.data === "already claimed") return;
    else {
      toast.success('Claiming XP successfully finished!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      getClaimData();
    }
  };
  return (
    <div id="claim" className="px-4 md:px-24 flex justify-center">
      <div className="flex gap-8 w-full py-8 text-body items-center flex-col justify-center md:w-[500px]">
        <h3 className="font-Conthrax text-white tracking-widest text-xl md:text-2xl md:w-[500px] text-center">NEXT CLAIM</h3>
        <div className="flex gap-4 md:gap-8">
          <TimeShow time={waitingTime} type="day" />
          <TimeShow time={waitingTime} type="hour" />
          <TimeShow time={waitingTime} type="minute" />
          <TimeShow time={waitingTime} type="second" />
        </div>
        <img src="/images/NFTs.gif" alt="NFT-gif" className="rounded-[12px] md:rounded-[36px] border-brand border-2" />
        <div className="text-center m-text-header text-white">{xp}xp</div>
        <div className="flex justify-center">
          <button
            className={`${(claimData[6] === true ? "bg-line text-main" : "")} mt-8 bg-brand rounded-lg py-3 px-12 text-back font-button ${(claimData[6] === true ? "cursor-not-allowed" : "hover:opacity-80 anim cursor-pointer")} z-10`}
            onClick={() => {
              handleClaim();
            }}
          >
            Claim Your Daily XP
          </button>
          <ToastContainer />
        </div>
        <div className=" flex sm:text-xs text-sm font-Conthrax text-white gap-8 sm:gap-4">
          {claimData.map((item: any, id: number) => {
            return (
              <div
                className="flex flex-col items-center"
                key={"claim-data-" + id}
              >
                <div>{days[(id + new Date().getDay()) % 7]}</div>
                <div className="">
                  {item ? (
                    <Tick className="text-brand w-14 h-14 sm:w-8 sm:h-8" />
                  ) : (
                    <Cross className="stroke-brand w-14 h-14 sm:w-8 sm:h-8" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Claim;
