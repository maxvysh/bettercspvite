import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotLoggedInScreen = () => {
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
        <p className="text-white font-light text-4xl">
          You are going to have to log in to access that screen 🥲
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

export default NotLoggedInScreen;
