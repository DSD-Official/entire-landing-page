import React from "react";
// import ParticleBack from "components/ParticleBack";
import { mockDescription, mockRoadmap } from "mock/global";
// import Button from "components/Button";
import { ReactComponent as Foot } from "assets/svg/dog-foot.svg";

const Roadmap = () => {
  return (
    <div id="roadmap" className="relative w-full m-gap pb-[50vw]">
      {/* <ParticleBack></ParticleBack> */}
      <div className="m-text-header text-center tracking-[1vw] m-container w-full sm:w-auton">
        Our Roadmap
      </div>
      <div className="flex justify-end">
        <img
          src="/images/header-light.png"
          draggable="false"
          className=" block scale-y-[1]"
          alt="Network"
        ></img>
      </div>
      <div className="absolute bottom-0">
        <img src="/images/Hologram.png" alt="Hologram" />
      </div>
      <div className="relative w-full m-container text-center">
        <div className="m-mt m-text-normal w-full mx-auto max-w-[1000px]">
          {mockDescription.roadmap}
        </div>
        <div className="m-mt max-w-[1600px] mx-auto m-text-normal ">
          {mockRoadmap.map((item: any, id: number) => {
            return (
              <div
                className={
                  "relative max-w-[600px] w-full  aspect-[4.5/3] mt-3 " +
                  (id === 0 ? "mr-auto" : id === 1 ? "mx-auto" : "ml-auto")
                }
                key={`roadmap-${id}`}
              >
                <img
                  src={
                    id !== 2
                      ? "/images/Roadmap Box.png"
                      : "/images/Roadmap Box late.png"
                  }
                  draggable="false"
                  className={
                    "absolute top-0 -left-[10%] w-[100%] max-w-none aspect-[5/3] hidden lg:block " +
                    (id !== 2 ? "lg:w-[150%] lg:aspect-[6.25/3]" : "")
                  }
                  alt="Roadmap Box"
                ></img>
                <img
                  src={"/images/Roadmap Box late.png"}
                  draggable="false"
                  className={
                    "absolute top-0 -left-[10%] w-[110%] max-w-none aspect-[5/3] block lg:hidden "
                  }
                  alt="Roadmap Box late"
                ></img>
                <div className="relative h-full pt-[4.8%] pl-[10%] pr-[17%] pb-[8%]">
                  <div className="h-[15%] m-text-big m-font text-left flex items-center">
                    {item.duration}
                  </div>
                  <div className="mt-[12%] m-text-small text-left">
                    {item.data.map((it: any, i: number) => {
                      return (
                        <div
                          className="flex items-start"
                          key={`roadmap-${id}-${i}`}
                        >
                          <div
                            className={
                              "md:w-8 md:h-8 w-5 h-5 flex-none " +
                              (it.result && "active-foot")
                            }
                          >
                            <Foot className="w-full h-full"></Foot>
                          </div>
                          <div>{it.text}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
