import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "assets/svg/logo-third.svg";
import { ReactComponent as Menu } from "assets/svg/menu.svg";
import { ReactComponent as Cross } from "assets/svg/cross.svg";

import { mockNavbar } from "mock/global";
import ConnectButton from "components/ConnectButton";
import WalletConnectModal from "components/WalletConnectModal";
import { logout, useGetAccountInfo } from "hooks";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { account } = useGetAccountInfo();

  const toggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (id: string) => {
    if (id === "swap" || id === "mint") {
      navigate(`/${id}`);
      return
    }
    window.scrollTo({ top: document.getElementById(id)?.offsetTop, behavior: 'smooth' });
  }

  const handleClickConnect = (): void => {
    setOpen(false)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="flex justify-between items-center pt-4 pb-3 w-full fixed top-0 left-0 z-[999] m-container nav-blur">
        <Link to="/">
          <Logo className="w-[200px] h-full cursor-pointer" />
        </Link>
        <div className="hidden lg:flex md:gap-4 lg:gap-6 xl:gap-12 items-center">
          {mockNavbar.map((item: any, id: number) => {
            return (
              <div key={`nav-web-${id}`} onClick={() => handleMenuClick(item.id)}>
                <h4 className="cursor-pointer text-header hover:text-brand anim font-Conthrax text-sm">
                  {item.text}
                </h4>
              </div>
            );
          })}
        </div>
        <div className="hidden lg:flex">
          <ConnectButton onClick={handleClickConnect} />
        </div>
        <Menu className="w-6 h-6 cursor-pointer lg:hidden" onClick={toggle} />
      </div>
      {open && (
        <div className="fixed top-0 left-0 z-[1000] flex flex-col items-center justify-between w-full h-full gap-4 nav-blur">
          <Cross
            className="absolute w-12 h-12 cursor-pointer top-4 right-4 hover:rotate-180 anim"
            onClick={toggle}
          />
          <div className="flex flex-col items-center gap-4 mt-36">
            {mockNavbar.map((item: any, id: number) => {
              return (
                <a
                  key={`nav-mobile-${id}`}
                  href={item.link}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <h2 className="text-center cursor-pointer text-header hover:text-[#3d4a66] font-Conthrax">
                    {item.text}
                  </h2>
                </a>
              );
            })}
          </div>
          <div className="mb-32">
            <ConnectButton onClick={handleClickConnect} />
          </div>
        </div>
      )}
      <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
