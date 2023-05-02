import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainLayout from "layouts/MainLayout";
import axios from "config/axios";
import { useGetAccountInfo } from "hooks";
import { shortenAddress } from "utils";

const days = ["MON", "TUE", "WED", "THR", "FRI", "SAT", "SUN"];
const Claim = () => {
  const { account } = useGetAccountInfo();
  const address = account.address;
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [claimData, setClaimData] = useState([]);
  const [xp, setXp] = useState(0);
  const [watingTime, setWatingTime] = useState(0);
  useEffect(() => {
    const timerClock = setInterval(() => {
      setWatingTime(watingTime - 1);
    }, 1000);
    return () => clearInterval(timerClock);
  }, [watingTime]);

  const getClaimData = async () => {
    const result = await axios.get("/claim_data/" + address);
    setXp(result.data.xp);
    setClaimData(result.data.status);
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
  };
  const getTableData = async () => {
    const result: any = await axios.get("/claim");
    setTableData(result.data);
  };
  useEffect(() => {
    getClaimData();
    getTableData();
    setWatingTime(
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
    setPageCount(1);
    return () => {};
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
    const result: any = await axios.post("/claim", { address });
    if (result.data == "already claimed") return;
    else {
      getClaimData();
    }
  };
  const handlePageClick = (e: any) => {
    setItemOffset(e.selected + 1);
  };
  return (
    <MainLayout title="dashboard">
      <div className="flex gap-8 xl:max-w-[1120px] lg:max-w-[700px] md:max-w-[500px] w-full py-8 text-body items-center xl:flex-row flex-col justify-center px-4">
        <div className=" w-full ">
          <div className="text-center m-text-header text-white">{xp}xp</div>
          <div className="m-mt m-text-normal text-center">
            Claim your daily experience here.
          </div>
          <div className="m-mt m-app-border py-8">
            <div className=" flex justify-evenly m-text-small">
              {claimData.map((item: any, id: number) => {
                return (
                  <div
                    className="flex flex-col items-center"
                    key={"claim-data-" + id}
                  >
                    <div>{days[(id + new Date().getDay()) % 7]}</div>
                    <div className="mt-4">
                      {item ? (
                        <img
                          src="/images/check.png"
                          className="md:w-8 w-6"
                        ></img>
                      ) : (
                        <img
                          src="/images/close.png"
                          className="md:w-8 w-6"
                        ></img>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {claimData[6] && (
              <div className="m-mt m-text-large text-center">
                {("t" + (Math.floor(watingTime / 3600) + 100)).replace(
                  "t1",
                  ""
                ) +
                  " : " +
                  ("t" + ((Math.floor(watingTime / 60) % 60) + 100)).replace(
                    "t1",
                    ""
                  ) +
                  " : " +
                  ("t" + (Math.floor(watingTime % 60) + 100)).replace("t1", "")}
              </div>
            )}
            <div className="flex justify-center">
              <button
                className={
                  (claimData[6] == true ? "bg-line text-main" : "") +
                  " mt-8 bg-brand rounded-lg py-3 px-12 text-back font-button " +
                  (claimData[6] == true ? "cursor-not-allowed" : "hover:opacity-80 anim cursor-pointer")
                }
                onClick={() => {
                  handleClaim();
                }}
              >
                Claim Your Daily XP
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
        <div className="w-full xl:w-[373px] flex-none text-normal md:text-lg leading-relaxed m-app-border p-4 md:min-h-[600px] min-h-[400px] flex flex-col justify-between gap-8">
          <table className="w-full text-center border-spacing-y-2 border-collapse">
            <thead>
              <tr className="text-white">
                <th>Rank</th>
                <th>Address</th>
                <th>XP</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item: any, id: number) => {
                return (
                  <tr
                    key={"claimTable" + id}
                    className={` cursor-pointer hover:bg-[#fff2] anim ${
                      item.address == address
                        ? "bg-brand hover:bg-brand text-black"
                        : ""
                    }`}
                  >
                    <td className="py-1.5">{id + 1}</td>
                    <td className="py-1.5">{shortenAddress(item.address)}</td>
                    <td className="py-1.5">{item.xp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={(e) => {
                handlePageClick(e);
              }}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              previousLabel="<"
              activeClassName="text-brand"
              pageClassName=""
              pageLinkClassName="py-1 px-2 min-w-[30px] text-center border border-line"
              previousClassName=""
              previousLinkClassName="py-1 px-2 min-w-[30px] text-center border border-line"
              nextClassName=""
              nextLinkClassName="py-1 px-2 min-w-[30px] text-center border border-line"
              breakClassName=""
              breakLinkClassName="py-1 px-2 min-w-[30px] text-center border border-line"
              containerClassName="flex justify-center gap-2 text-sm select-none"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Claim;
