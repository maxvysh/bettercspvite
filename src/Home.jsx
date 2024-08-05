import { useEffect, useRef } from "react";
import CreateAccount from "@/components/CreateAccount";
import { Button } from "@/components/ui/button";
import "./css/Home.css";

function Home() {
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (bottomTextRef.current && topTextRef.current) {
        const bottomTextWidth = bottomTextRef.current.offsetWidth;
        topTextRef.current.style.width = `${bottomTextWidth}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set the width

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-[#0f172a] via-[#305180] via-[#3361a1] to-[#f8fafc]">
      <div className="flex flex-col">
        <div className="animated-title ml-8 h-fit -mt-6">
          <div className="text-top" ref={topTextRef}>
            <div>
              <span className="text-[172px] text-white -mt-10">RUPlanning</span>
            </div>
          </div>
          <div className="text-bottom" ref={bottomTextRef}>
            <div>
              <span className="text-[72px] text-white">
                A better way to plan your Rutgers schedule
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <CreateAccount />
          <div className="flex flex-col max-w-[426px] w-full gap-2">
            <Button className="bg-white text-[#020817] hover:bg-[#cbd5e1]">
              Learn More About RUPlanning
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
