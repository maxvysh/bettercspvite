import "../css/Header.css";
import RutgersLogo from "../assets/Rutgers_Scarlet_Knights_logo.svg";

const Header = () => {
  return (
    <header>
      <div className="px-5 h-20 w-full flex justify-between">
        <h2 className="text-white">RUPlanning</h2>
          <img src={RutgersLogo} alt="Rutgers Logo" className="mt-2 w-[64px] h-[64px]" />
        <div className="h-full w-48 flex items-center justify-between">
          <p className="text-white">Home</p>
          <p className="text-white">About</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
