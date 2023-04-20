import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import MainLayout from "layouts/MainLayout";

const tableData = [
  { rank: 1, address: "erd130...pmez", xp: "4,000xp" },
  { rank: 2, address: "erd130...pmez", xp: "3,000xp" },
  { rank: 3, address: "erd130...pmez", xp: "3,000xp" },
  { rank: 4, address: "erd130...pmez", xp: "3,000xp" },
  { rank: 5, address: "erd130...pmez", xp: "2,000xp" },
  { rank: 6, address: "erd130...pmez", xp: "2,000xp" },
  { rank: 7, address: "erd130...pmez", xp: "2,000xp" },
];

const Claim = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    setPageCount(tableData.length);
    return () => {};
  }, []);

  const handlePageClick = (e: any) => {};
  return (
    <MainLayout title="dashboard">
      <div className="flex gap-8 xl:max-w-[1120px] lg:max-w-[700px] md:max-w-[500px] w-full py-8 text-body items-center xl:flex-row flex-col justify-center px-4">
        <div className=" w-full ">
          <div className="text-center m-text-header text-white">400xp</div>
          <div className="m-mt m-text-normal">
            Description HereDescription He reDesc ription Her e Description Here
            Descr iption H ere D escription Here Description He re Descr iption
            Here Descri ption Here Descrip tion Here Description Here
            Description Here Description Here D escription Here Description Here
            Descripti on Here Description Here Descr iption Here
          </div>
          <div className="m-mt m-app-border py-8">
            <div className=" flex justify-evenly m-text-small">
              <div className="flex flex-col items-center">
                <div>MON</div>
                <div className="mt-4">
                  <img
                    src="/images/close.png"
                    className="md:w-8 w-6 block"
                  ></img>
                  <img
                    src="/images/check.png"
                    className="md:w-8 w-6 hidden"
                  ></img>
                </div>
              </div>
              <div className="flex flex-col  items-center">
                <div>TUE</div>
                <div className="mt-4">
                  <img
                    src="/images/close.png"
                    className="md:w-8 w-6 block"
                  ></img>
                  <img
                    src="/images/check.png"
                    className="md:w-8 w-6 hidden"
                  ></img>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>WED</div>
                <div className="mt-4">
                  <img
                    src="/images/close.png"
                    className="md:w-8 w-6 block"
                  ></img>
                  <img
                    src="/images/check.png"
                    className="md:w-8 w-6 hidden"
                  ></img>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>THU</div>
                <div className="mt-4">
                  <img
                    src="/images/close.png"
                    className="md:w-8 w-6 block"
                  ></img>
                  <img
                    src="/images/check.png"
                    className="md:w-8 w-6 hidden"
                  ></img>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>FRI</div>
                <div className="mt-4">
                  <img
                    src="/images/close.png"
                    className="md:w-8 w-6 block"
                  ></img>
                  <img
                    src="/images/check.png"
                    className="md:w-8 w-6 hidden"
                  ></img>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>SAT</div>
                <div className="mt-4">
                  <img
                    src="/images/close.png"
                    className="md:w-8 w-6 block"
                  ></img>
                  <img
                    src="/images/check.png"
                    className="md:w-8 w-6 hidden"
                  ></img>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div>SUN</div>
                <div className="mt-4">
                  <img
                    src="/images/close.png"
                    className="md:w-8 w-6 hidden"
                  ></img>
                  <img
                    src="/images/check.png"
                    className="md:w-8 w-6 block"
                  ></img>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className=" mt-8 bg-brand rounded-lg py-3 px-12 text-back font-button hover:opacity-80 anim cursor-pointer">
                Claim Your Daily XP
              </button>
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
              {tableData.map((item, id) => {
                return (
                  <tr
                    key={"claimTable" + id}
                    className={` cursor-pointer hover:bg-[#fff2] anim ${
                      id == 3 ? "bg-brand hover:bg-brand text-black" : ""
                    }`}
                  >
                    <td className="py-1.5">{item.rank}</td>
                    <td className="py-1.5">{item.address}</td>
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
              pageClassName="py-1 px-2 min-w-[30px] text-center border border-line"
              pageLinkClassName="page-link"
              previousClassName="py-1 px-2 min-w-[30px] text-center border border-line"
              previousLinkClassName="page-link"
              nextClassName="py-1 px-2 min-w-[30px] text-center border border-line"
              nextLinkClassName="page-link"
              breakClassName="py-1 px-2 min-w-[30px] text-center border border-line"
              breakLinkClassName="page-link"
              containerClassName="flex justify-evenly text-sm select-none"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Claim;
