import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Error404Screen = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col"
      style={{
        backgroundImage: `url(/cloud_frame.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-12 items-center justify-center min-h-screen">
        <h1 className="text-white font-light text-8xl">Error 404!</h1>
        <p className="text-white font-light text-3xl">
          Page not found 🥲
        </p>
        <Button
          className="bg-white text-[#020817] hover:bg-[#cbd5e1] ml-4"
          onClick={() => navigate("/")}
        >
          Take me back to the home page
        </Button>
      </div>
    </div>
  );
};

export default Error404Screen;
