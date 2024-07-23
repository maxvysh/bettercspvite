import Timetable from "@maxvysh/react-timetable-events";
import { Card } from "@/components/ui/card";

const Calendar = ({ eventsByDay }) => {
  return (
    <div>
      <Timetable events={eventsByDay} style={{ height: "500px" }} />
      <Card className="flex gap-2 p-1 justify-between">
        <Card className="w-fit bg-[#ffcb99]">
          <p className="p-1">ONLINE</p>
        </Card>
        <Card className="w-fit bg-[#cdeeff]">
          <p className="p-1">BUSCH</p>
        </Card>
        <Card className="w-fit bg-[#ffffcb]">
          <p className="p-1">COLLEGE AVENUE</p>
        </Card>
        <Card className="w-fit bg-[#ddffdd]">
          <p className="p-1">COOK / DOUGLASS</p>
        </Card>
        <Card className="w-fit bg-[#ffcb98]">
          <p className="p-1">LIVINGSTON</p>
        </Card>
        <Card className="w-fit bg-[#ffd7ee]">
          <p className="p-1">DOWNTOWN</p>
        </Card>
        <Card className="w-fit bg-[#e3bfff]">
          <p className="p-1">CAMDEN</p>
        </Card>
        <Card className="w-fit bg-[#edeedc]">
          <p className="p-1">NEWARK</p>
        </Card>
      </Card>
    </div>
  );
};

export default Calendar;
