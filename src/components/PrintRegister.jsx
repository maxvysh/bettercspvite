import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Printable from "./Printable";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintRegister = ({ indexData, eventsByDay }) => {
  const printableRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
  });

  return (
    <Card className="flex flex-col justify-evenly p-2 border-2 gap-1">
      <Button className="border-2 text-base" onClick={handlePrint}>
        Print
      </Button>
      <Button className="border-2 text-base">
        Register
      </Button>
      <div className="absolute top-[-9999px] left-[-9999px]">
        <Printable ref={printableRef} indexData={indexData} eventsByDay={eventsByDay} />
      </div>
    </Card>
  );
};

export default PrintRegister;