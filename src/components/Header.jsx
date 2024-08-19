import "../css/Header.css";
import RutgersLogo from "../assets/Rutgers_Scarlet_Knights_logo.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full">
      <div className="px-5 h-20 flex justify-between">
        <h2 className="text-white">RUPlanning</h2>
          <img src={RutgersLogo} alt="Rutgers Logo" className="mt-2 w-[64px] h-[64px]" />
        <div className="h-full w-48 flex items-center justify-between text-xl">
          <button className="text-white">Home</button>
          <button className="text-white" onClick={() => navigate("/about")}>About</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
