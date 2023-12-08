import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Address,
  AddressValue,
  SmartContract,
  U64Value,
  ContractFunction,
  Interaction,
  U32Value,
  TokenTransfer,
} from "@multiversx/sdk-core";

import Navbar from "layouts/Navbar";

import MainLayout from "layouts/MainLayout";
import axios from "config/axios";
import { refreshAccount, useGetAccountInfo } from "hooks";
import { shortenAddress } from "utils";
import ParticleBack from "components/ParticleBack";
import { MINTING_CONTRACT_ADRESS } from "config";
import { sendTransactions } from "hooks";
import { ReactComponent as EGLD } from "assets/svg/EGLD.svg";

const days = ["MON", "TUE", "WED", "THR", "FRI", "SAT", "SUN"];

const Mint = () => {
  const { account } = useGetAccountInfo();
  const address = account.address;
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [claimData, setClaimData] = useState([]);
  const [cnt, setCount] = useState(0);
  const [xp, setXp] = useState(0);
  const [watingTime, setWatingTime] = useState(0);
  useEffect(() => {
    const timerClock = setInterval(() => {
      setWatingTime(watingTime - 1);
    }, 1000);
    return () => clearInterval(timerClock);
  }, [watingTime]);

  useEffect(() => {}, []);

  const handleClaim = async () => {
    if (!account.address) {
      toast.warn("Please connect your wallet first!", {
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
    const result: any = await axios.post("/claim", { address });
    if (result.data === "already claimed") return;
    else {
      toast.success("Claiming XP successfully finished!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleMint = async () => {
    await refreshAccount();
    if (!account.address) {
      toast.warn("Please connect your wallet first!", {
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

    const mintTransaction = {
      value: 0.005 * 3 * 10 ** 18,
      data: "mint@03",
      receiver: MINTING_CONTRACT_ADRESS,
      gasLimit: "60000000",
    };
    await sendTransactions({
      transactions: mintTransaction,
    });
  };

  const handlePageClick = (e: any) => {
    setItemOffset(e.selected + 1);
  };
  return (
    <div className="relative w-screen min-h-screen bg-back text-white scroll-smooth overflow-y-hidden">
      <Navbar />
      <ParticleBack />
      <div id="mint">
        <img
          src="/images/Header3.png"
          className="absolute top-0 left-0 w-screen h-screen"
          alt="back-particle"
        />
        <div className="md:h-screen md:flex md:items-center md:justify-center md:px-10 px-5">
          <div className="relative flex flex-col-reverse md:justify-center md:gap-10 xl:gap-20 items-center md:flex-row rounded-3xl">
            <div className="relative overflow-hidden flex flex-col justify-center mt-10 md:mt-0">
              <div className="z-30 flex flex-col items-center md:items-start">
                <div className="relative">
                  <h1 className="font-[Conthrax] uppercase font-normal text-[#00FFFF] italic text-4xl md:text-[5vw] min-w-[400px] md:min-w-[600px] xl:text-[66px] leading-tight absolute top-1 left-1 opacity-30">
                    <div>Join the</div>
                    <div>{"Ddogs Mint"}</div>
                    <div>Draw</div>
                  </h1>
                  <h1 className="font-[Conthrax] uppercase font-normal text-[#00FFFF] italic text-4xl md:text-[5vw] md:min-w-[600px] xl:text-[66px] leading-tight">
                    <div>Join the</div>
                    <div>{"Ddogs Mint "}</div>
                    <div>Draw</div>
                  </h1>
                </div>
                <p className="sm:mt-4 mt-8 font-[Inter Regular] font-semibold sm:text-xs text-white w-full text-md max-w-[650px] break-all">
                  Early supporters can mint up an EBONE card and stand a chance
                  to get one item from out prize pool. After 5 consecutive
                  draws, you get another 3card drawing opportunity
                </p>
                <div className="flex sm:mt-4 mt-8">
                  <div className="min-w-[100px]">
                    <p className="opacity-30">30%</p>
                    <p className="mt-2">1 EBONE</p>
                  </div>
                  <div className="min-w-[100px] border-l-2 border-[#1E2436] px-4">
                    <p className="opacity-30">30%</p>
                    <p className="mt-2">10 EBONE</p>
                  </div>
                  <div className="min-w-[100px] border-l-2 border-[#1E2436] px-4">
                    <p className="opacity-30">30%</p>
                    <p className="mt-2">50 EBONE</p>
                  </div>
                </div>
                <div className="flex sm:mt-4 mt-8">
                  <div className="min-w-[100px]">
                    <p className="opacity-30">9%</p>
                    <p className="mt-2">100 EBONE</p>
                  </div>
                  <div className="border-l-2 border-[#1E2436] px-4">
                    <p className="opacity-30">1%</p>
                    <p className="mt-2">Extra Mint Pass</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden flex justify-center">
              <div className="w-full my-4 md:my-16 flex gap-2 flex-col border-8 border-[#00FFFF] p-2 rounded-3xl mt-20 md:mt-0">
                <img
                  className="w-full object-cover ease-in-out duration-500 hover:-skew-x-12"
                  src="/images/mint/1.png"
                />
                <div className="grid gap-2 grid-cols-3 w-full">
                  <img
                    className="w-full object-cover ease-in-out duration-500 hover:rotate-6 hover:scale-125"
                    src="/images/mint/2.png"
                  />
                  <img
                    className="w-full object-cover ease-in-out duration-500 hover:scale-125"
                    src="/images/mint/3.png"
                  />
                  <img
                    className="w-full object-cover ease-in-out duration-500 hover:-rotate-6 hover:scale-125"
                    src="/images/mint/4.png"
                  />
                </div>
                <img
                  className="w-full object-cover ease-in-out duration-500 hover:skew-x-12"
                  src="/images/mint/5.png"
                />
              </div>
              <button
                className="flex justify-center items-center gap-0.5 z-50 px-4 py-3 border-4 border-[#00FFFF] bg-[#f5bc63] text-[#000] font-[900] rounded-xl absolute bottom-0 md:bottom-12 cursor-pointer"
                onClick={handleMint}
              >
                {`MINT NOW (10`}
                <EGLD className="w-4 h-4" />
                {")"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
