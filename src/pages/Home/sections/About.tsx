// import ParticleBack from "components/ParticleBack";
import { mockDescription, mockabout1, mockabout2 } from "mock/global";
import Button from "components/Button";
import { ReactComponent as Logo } from "assets/svg/logo-new.svg";

const About = () => {
  return (
    <div id="about" className="relative w-full m-gap">
      {/* <ParticleBack></ParticleBack> */}
      <div className="flex justify-center">
        <div className="not-italic m-text-header flex flex-row items-center text-center tracking-[1vw] m-container uppercase text-[#43FFC4] gap-5">
          <span><Logo className="w-10 h-full" /></span>
          About
          <span className="-ml-3"><Logo className="w-10 h-full" /></span>
        </div>
      </div>

      <div className="m-container">
        <div className="flex flex-col items-center md:gap-[10%]">
          <div className="m-text-large text-center m-mt font-extrabold mx-[15%] leading-normal">
            A collection of <span className="text-[#43FFC4]">10,000</span> avatars gives access to the <span className="text-[#43FFC4]">Yard</span>, where players can interact and play for crypto. <span className="text-[#43FFC4]">Stake</span> your NFT for rewards and a chance to hit <span className="text-[#43FFC4]">jackpots!</span>
          </div>
          <div className="flex sm:justify-center mt-5 md:my-20">
            <Button className="" text="STAKE NOW"></Button>
          </div>

        </div>
        <div className="font-[Conthrax] p-0 text-sm md:text-3xl lg:text-5xl uppercase m-container text-center font-black tracking-[0.5rem] m-mt">
          stake your ddog nft
          <div className="relative">for rewards and airdrops</div>
        </div>
        <div className=" max-w-[1300px] mx-auto">
          <div className="flex justify-between md:gap-4 items-center md:flex-row flex-col ">
            {mockabout1.map((item: any, id: number) => {
              return (
                <div
                  className="m-mt relative border-brand border-2 rounded-xl p-10 md:basis-1/4 w-full md:w-auto flex flex-row md:flex-col justify-start items-center gap-4"
                  key={`news-${id}`}
                >
                  <img
                    src={item.imgUrl}
                    draggable="false"
                    className="relative aspect-square w-20 m-0 md:mx-auto"
                    alt="icon"
                  />
                  <div>
                    <div className="text-center m-text-small">{item.name}</div>
                    <div className="text-center m-text-big font-bold">
                      {item.amount}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 relative border-brand border-2 rounded-xl p-10 flex justify-start items-center gap-4 flex-row">
            <img
              src={mockabout2.imgUrl}
              draggable="false"
              className="relative aspect-square w-20"
              alt="icon"
            />
            <div>
              <div className="text-center m-text-small">{mockabout2.name}</div>
              <div className="text-center m-text-big font-bold">
                {mockabout2.amount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
