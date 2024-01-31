import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const ClassRow = ({ offeringUnitCode, subject, courseNumber }) => {

  return (
    <div>
      {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
      <Card>{offeringUnitCode}:{subject}:{courseNumber}</Card>
    </div>
  );
};

export default ClassRow;
