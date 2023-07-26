import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { mockMain } from "mock/global";
import Button from "components/Button";

const MainCarousel = () => {
  const [wave, setWave] = useState([]);

  useEffect(() => {
    const timerWave = setInterval(() => {
      const waves = [];
      for (let i = 0; i < 20; i++) {
        waves.push(Math.random() * 30 + 1);
      }
      setWave(waves);
    }, 500);

    return () => clearInterval(timerWave);
  }, [wave]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 500000,
    customPaging: function (i) {
      return (
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "gray",
          }}
        />
      );
    },
  };

  return (
    <Slider {...settings}>
      {mockMain.map((item, id) => {
        return (
          <div className="relative" key={"Mcarousel" + id}>
            <div className="relative m-container flex flex-col-reverse justify-center md:gap-10 xl:gap-30 items-center md:flex-row bg-[#000B1B] m-10 p-10 mb-0 rounded-3xl">
              <div className="z-30 flex flex-col justify-center items-center">
                <div className="relative">
                  <h1 className="font-[Conthrax] uppercase font-normal text-[#00FFFF] italic text-3xl md:text-[5vw] xl:text-[80px] leading-tight absolute top-0 left-1 xl:left-2 opacity-30">
                    <div>{item.header1}</div>
                    <div>{item.header2}</div>
                  </h1>
                  <h1 className="font-[Conthrax] uppercase font-normal text-[#00FFFF] italic text-3xl md:text-[5vw] xl:text-[80px] leading-tight">
                    <div>{item.header1}</div>
                    <div>{item.header2}</div>
                  </h1>
                </div>
                <p className="sm:mt-4 mt-8 uppercase font-[Inter Regular] font-semibold sm:text-sm text-white w-full m-text-big max-w-[500px] text-center">
                  {item.content1}
                </p>
                {/* <div className="flex gap-1 items-end min-h-[31px] mt-6">
                  {wave.map((item, id) => {
                    return (
                      <div
                        key={id}
                        className="w-1.5 bg-chart"
                        style={{ height: item + "px" }}
                      ></div>
                    );
                  })}
                </div> */}
                <p className="mt-8 sm:text-sm font-[Cera Pro] text-white font-semibold w-full max-w-[500px] m-text-normal text-center opacity-60 tracking-[0.1em]">
                  {item.content2}
                </p>
              </div>
              <div className="basis-5/12 flex-none max-w-[500px] relative pb-5">
                <img
                  src={item.imgUrl}
                  className="w-full z-20 sm:px-10"
                  alt="Cards"
                ></img>
              </div>
            </div>
            <div className="relative flex justify-center items-center -top-[20px]">
              <Button className="" text={item.button}></Button>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default MainCarousel;
