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
      <div className="flex justify-between mx-2">
        <p className="w-[56px] flex items-center justify-center">
          {section + 1 < 10 ? (
            <span>0{section + 1}</span>
          ) : (
            <span>{section + 1}</span>
          )}
        </p>
        <p>{openStatus ? <span>OPEN</span> : <span>CLOSED</span>}</p>
        <p>{index}</p>
        <div>
          {meetingTimes.map((time, index) => (
            <MeetingTimes
              key={index}
              meetingDay={time.meetingDay}
              startTime={time.startTime}
              endTime={time.endTime}
              campusName={time.campusName}
            />
          ))}
        </div>
        <p>{examCode}</p>
        <div>
          {instructors.map((instructor, index) => (
            <p key={index}>{instructor.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownSection;
