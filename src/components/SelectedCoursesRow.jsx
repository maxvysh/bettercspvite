import { Card } from "@/components/ui/card";
import xCircle from "../assets/x-circle.svg";
import SVG from "react-inlinesvg";

const SelectedCoursesRow = () => {
  return (
    <div>
      <Card className="flex justify-between align-middle items-center w-full px-3">
        <button>
          <SVG
            src={xCircle}
            alt="X"
            className="w-5 h-5 black hover:text-red-500"
          />
        </button>
        <p>01:198:300</p>
        <p className="font-semibold w-36">Introduction to Computer System</p>
      </Card>
    </div>
  );
};

export default SelectedCoursesRow;
