import Timetable from "@maxvysh/react-timetable-events";
import { Card } from "@/components/ui/card";

const Calendar = ({ eventsByDay }) => {
  return (
    <div className="flex flex-col gap-2">
      <Timetable events={eventsByDay} style={{ height: "500px" }} />
      <Card className="flex justify-between min-w-fit">
        <div className="w-fit bg-[#ff8081] flex-grow rounded-l-lg">
          <p className="p-1 text-center">ONLINE</p>
        </div>
        <div className="w-fit bg-[#cdeeff] flex-grow">
          <p className="p-1 text-center">BUSCH</p>
        </div>
        <div className="w-fit bg-[#ffffcb] flex-grow">
          <p className="p-1 text-center">COLLEGE AVENUE</p>
        </div>
        <div className="w-fit bg-[#ddffdd] flex-grow">
          <p className="p-1 text-center">COOK / DOUGLASS</p>
        </div>
        <div className="w-fit bg-[#ffcb98] flex-grow">
          <p className="p-1 text-center">LIVINGSTON</p>
        </div>
        <div className="w-fit bg-[#ffd7ee] flex-grow">
          <p className="p-1 text-center">DOWNTOWN</p>
        </div>
        <div className="w-fit bg-[#e3bfff] flex-grow">
          <p className="p-1 text-center">CAMDEN</p>
        </div>
        <div className="w-fit bg-[#edeedc] flex-grow rounded-r-lg">
          <p className="p-1 text-center">NEWARK</p>
        </div>
      </Card>
    </div>
  );
};

export default Calendar;
