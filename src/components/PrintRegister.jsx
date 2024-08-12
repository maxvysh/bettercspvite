import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Printable from "./Printable";
import { useRef, useContext, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import AppContext from "@/AppContext";

const PrintRegister = ({ indexData, eventsByDay, currentIndexes }) => {
  const printableRef = useRef();
  const { semester, fetchCampusSemester } = useContext(AppContext);

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
  });

  useEffect(() => {
    if (!semester) {
      fetchCampusSemester();
    }
  }, [semester]);

  useEffect(() => {
    console.log('adhabbdhjabwfjhbawjhfbajwbfjhawbfhjabwjhfb', currentIndexes);
    // Flatten currentIndexes to a string where every index is separated by a comma
    const indexList = currentIndexes.join(",");
  }, [currentIndexes]);

  // https://sims.rutgers.edu/webreg/editSchedule.htm?login=cas&semesterSelection=92024&indexList=07633,24314,08239
  return (
    <Card className="flex flex-col justify-evenly p-2 border-2 gap-1">
      <Button className="border-2 text-base" onClick={handlePrint}>
        Print
      </Button>
      <Button
        className="border-2 text-base"
        onClick={() =>
          (window.location.href = `https://sims.rutgers.edu/webreg/editSchedule.htm?login=cas&semesterSelection=${semester}&indexList=${currentIndexes.join(",")}`)
        }
      >
        Register
      </Button>
      <div className="absolute top-[-9999px] left-[-9999px]">
        <Printable
          ref={printableRef}
          indexData={indexData}
          eventsByDay={eventsByDay}
        />
      </div>
    </Card>
  );
};

export default PrintRegister;
