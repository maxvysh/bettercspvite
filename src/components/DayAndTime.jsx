import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DayAndTime = () => {
  return (
    <div>
      <div className="flex justify-between px-3">
        <p>Day and Time</p>
      </div>
      <Card>
        <Button className="m-1.5 h-fit">Add Time Filter</Button>
      </Card>
    </div>
  );
};

export default DayAndTime;
