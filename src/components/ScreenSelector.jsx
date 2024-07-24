import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const ScreenSelector = () => {
  const location = useLocation();
  const currentPage = location.pathname;
  const navigate = useNavigate();

  const handleClick = (page) => {
    // fetch(`http://localhost:3000/${page}`)
    //   .then((response) => response.text())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => console.error("Error:", error));

    // return () => {
    //   window.location.href = `http://localhost:3000/${page}`;
    // };

    return () => navigate(`/${page}`);
  };

  return (
    <Card className="flex flex-col justify-evenly p-2 border-2 gap-1">
      {currentPage === "/classes" ? (
        <Button className="text-base">Select Schedule</Button>
      ) : (
        <Button variant="outline" className="border-2 text-base text-gray-500" onClick={handleClick('classes')}>
          Select Schedule
        </Button>
      )}

      {currentPage === "/sections" ? (
        <Button className="text-base">Select Sections</Button>
      ) : (
        <Button variant="outline" className="border-2 text-base text-gray-500" onClick={handleClick('sections')}>
          Select Sections
        </Button>
      )}

      {currentPage === "/build" ? (
        <Button className="text-base">Build Schedule</Button>
      ) : (
        <Button variant="outline" className="border-2 text-base text-gray-500" onClick={handleClick('build')}>
          Build Schedule
        </Button>
      )}

      {currentPage === "/saved" ? (
        <Button className="text-base">Saved Schedules</Button>
      ) : (
        <Button variant="outline" className="border-2 text-base text-gray-500" onClick={handleClick('saved')}>
          Saved Schedules
        </Button>
      )}

      {/* <Button variant="outline" className="border-2 text-base text-gray-500">Select Sections</Button>
        <Button variant="outline" className="border-2 text-base text-gray-500">Build Schedule</Button>
        <Button variant="outline" className="border-2 text-base text-gray-500">Saved Schedule</Button> */}
    </Card>
  );
};

export default ScreenSelector;