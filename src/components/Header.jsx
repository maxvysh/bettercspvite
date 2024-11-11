import "../css/Header.css";
import RutgersLogo from "../assets/ruplanning_logo-cropped.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await fetch(`/logout`, {
      method: "GET",
      credentials: "include", // Ensure cookies are sent with the request
    });

    if (response.ok) {
      // If the response is successful, navigate to the login page
      navigate("/");
    } else {
      // Handle error case
      console.error("Logout failed");
    }
  };

  return (
    <header className="w-full">
      <div className="px-5 h-20 flex items-center">
        <div className="flex-1 flex justify-start">
          <h2 className="text-white">RUPlanning</h2>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={RutgersLogo}
            alt="Rutgers Logo"
            className="w-20 h-20"
          />
        </div>
        <div className="flex-1 flex justify-end text-xl gap-8">
          <button className="text-white" onClick={() => navigate("/selectcs")}>
            Change Campus/Semester
          </button>
          <button className="text-white" onClick={() => navigate("/about")}>
            About
          </button>
          <button className="text-white" onClick={() => handleLogout()}>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
