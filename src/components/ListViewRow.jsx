import { useState } from "react";
import { Card } from "@/components/ui/card";
import MeetingTimes from "./MeetingTimes";

const ListViewRow = ({
  index,
  useTitle,
  section,
  examCode,
  status,
  meetingTimes,
  instructors,
  sectionNotes,
  sectionEligibility,
}) => {
  // const [useTitle, setUseTitle] = useState("");
  // const [section, setSection] = useState("");
  //   const [openStatus, setOpenStatus] = useState("");
  //   const [index, setIndex] = useState("");
  //   const [meetingTimes, setMeetingTimes] = useState([]);
  //   const [examCode, setExamCode] = useState("");
  //   const [instructors, setInstructors] = useState([]);

  return (
    <div className="border-t-2">
      <div className="grid grid-cols-8 mx-2 w-full">
        <p className="flex items-center justify-center col-span-1 font-medium">
          {useTitle}
        </p>
        <p className="flex items-center justify-center col-span-1">{section}</p>
        <p className="flex items-center justify-center col-span-1">
          {status ? (
            <span className="text-green-500">OPEN</span>
          ) : (
            <span className="text-red-500">CLOSED</span>
          )}
        </p>
        <p className="flex items-center justify-center col-span-1">{index}</p>
        <div className="flex items-center justify-center col-span-2">
          <div className="flex flex-col items-center justify-center">
            {meetingTimes.map((time, index) => (
              <div className="w-72" key={index}>
                <MeetingTimes
                  meetingDay={time.meetingDay}
                  startTime={time.startTime}
                  endTime={time.endTime}
                  campusName={
                    time.campusName
                      ? time.campusName
                          .replace("DOUGLAS/COOK", "COOK/DOUG")
                          .replace("COLLEGE AVENUE", "COLLEGE AVE")
                          .replace("** INVALID **", "ONLINE")
                      : ""
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <p className="flex items-center justify-center col-span-1">
          {examCode}
        </p>
        <div className="flex items-center justify-center col-span-1">
          {instructors.map((instructor, index) => (
            <p key={index}>{instructor.name}</p>
          ))}
        </div>
      </div>
      <div className="mx-1">
        {sectionNotes && <p>Section notes: {sectionNotes}</p>}
        {sectionEligibility && <p>Section eligibility: {sectionEligibility}</p>}
      </div>
    </div>
  );
};

export default ListViewRow;
