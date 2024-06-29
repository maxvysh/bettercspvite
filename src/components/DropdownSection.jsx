import MeetingTimes from "./MeetingTimes";

const DropdownSection = ({
  section,
  openStatus,
  index,
  meetingTimes,
  examCode,
  instructors,
}) => {
  return (
    <div className="border-t-2">
      <div className="mx-2 grid grid-cols-7 min-h-12">
        <p className="flex items-center justify-center col-span-1">
          {section}
        </p>
        <p className="flex items-center justify-center col-span-1">
          {openStatus ? <span className="text-green-500">OPEN</span> : <span className="text-red-500">CLOSED</span>}
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
                  campusName={time.campusName ? time.campusName.replace("DOUGLAS/COOK", "COOK/DOUG").replace("COLLEGE AVENUE", "COLLEGE AVE") : ''}
                />
              </div>
            ))}
          </div>
        </div>
        <p className="flex items-center justify-center col-span-1">{examCode}</p>
        <div className="flex items-center justify-center col-span-1">
          {instructors.map((instructor, index) => (
            <p key={index}>{instructor.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownSection;
