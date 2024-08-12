import Calendar from "./Calendar";
import { Card } from "./ui/card";
import ListViewRow from "./ListViewRow";
import { forwardRef } from "react";

const Printable = forwardRef(({ indexData, eventsByDay }, ref) => {
  return (
    <div ref={ref}>
      <Card className="border-2 min-w-[1200px] w-full">
        <div className="grid grid-cols-8 w-full mx-2">
          <p className="col-span-1 text-center">title</p>
          <p className="col-span-1 text-center">section</p>
          <p className="col-span-1 text-center">status</p>
          <p className="col-span-1 text-center">index</p>
          <p className="col-span-2 text-center">meeting times/locations</p>
          <p className="col-span-1 text-center">exam code</p>
          <p className="col-span-1 text-center">instructors</p>
        </div>
        {indexData.map((sectionData) => {
          return (
            <div key={sectionData.index}>
              <ListViewRow
                index={sectionData.index}
                status={sectionData.openStatus}
                useTitle={sectionData.useTitle}
                section={sectionData.number}
                meetingTimes={sectionData.meetingTimes}
                examCode={sectionData.examCode}
                instructors={sectionData.instructors}
              />
            </div>
          );
        })}
      </Card>
      <Calendar eventsByDay={eventsByDay} />
    </div>
  );
});

Printable.displayName = "Printable";

export default Printable;