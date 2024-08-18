import { useEffect, useRef } from "react";
import CreateAccount from "@/components/CreateAccount";
import { Button } from "@/components/ui/button";
import "./css/Home.css";

function Home() {
  return (
    <div
      className="h-screen flex flex-col min-w-[340px]"
      style={{
        backgroundImage: `url(/cloud_frame.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pt-8 flex justify-center">
        <div className="animated-title h-fit text-center flex flex-col items-center">
          <div className="text-top">
            <div>
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[172px] text-white">
                RUPlanning
              </span>
            </div>
          </div>
          <div className="text-bottom">
            <div>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white">
                A better way to plan your Rutgers schedule
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center gap-6 mx-2 mb-60">
        <CreateAccount />
        <div className="flex flex-col max-w-[426px] w-full gap-2">
          <Button className="bg-white text-[#020817] hover:bg-[#cbd5e1]">
            Learn More About RUPlanning
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
