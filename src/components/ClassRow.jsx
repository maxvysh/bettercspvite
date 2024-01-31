import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { useState } from "react";

const ClassRow = ({ campus, semester, level, subject }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("fetching subject data");
    console.log(campus, semester, level, subject);
    fetch(`/oldsoc/courses.json?subject=${subject}&semester=${semester}&campus=${campus}&level=${level}`)
      .then((response) => response.text())
      .then((data) => {
        setData(JSON.parse(data));
      })
      .catch((error) => console.error("Error:", error));

      console.log(data);
  }, [campus, semester, level, subject]);

  return (
    <div>
      {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
      {/* <Card>{data.offeringUnitCode}</Card> */}
    </div>
  );
};

export default ClassRow;
