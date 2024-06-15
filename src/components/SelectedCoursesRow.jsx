import { Card } from "@/components/ui/card";
import xCircle from "../assets/x-circle.svg";
import SVG from "react-inlinesvg";

const SelectedCoursesRow = ({
  key,
  offeringUnitCode,
  subject,
  courseNumber,
  useTitle,
  credits,
  selectedCourses,
  setSelectedCourses,
  buttonDisabler,
  setButtonDisabler,
  totalCredits,
  setTotalCredits,
}) => {
  const handleClick = async () => {
    const indexToRemove = selectedCourses.findIndex(
      (course) => course.key === key
    );
    if (indexToRemove !== -1) {
      selectedCourses.splice(indexToRemove, 1);
      setSelectedCourses([...selectedCourses]);
    }
    setButtonDisabler(true);
    await setTotalCredits(totalCredits - credits);
  };

  return (
    <div>
      <Card className="flex justify-between align-middle items-center w-full px-3 border-2">
        <button onClick={handleClick}>
          <SVG
            src={xCircle}
            alt="X"
            className="w-5 h-5 black hover:text-red-500"
          />
        </button>
        <p>
          {offeringUnitCode}:{subject}:{courseNumber}
        </p>
        <p className="font-semibold w-36">{useTitle}</p>
      </Card>
    </div>
  );
};

export default SelectedCoursesRow;
