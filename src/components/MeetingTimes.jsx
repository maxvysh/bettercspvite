
const MeetingTimes = ({ meetingDay, startTime, endTime, campusName }) => {
  return (
    <div className="grid grid-cols-12">
      <p className="col-span-7 text-center">
        {meetingDay && (
            <span>
                {meetingDay === "M" && "Mon"}
                {meetingDay === "T" && "Tue"}
                {meetingDay === "W" && "Wed"}
                {meetingDay === "TH" && "Thu"}
                {meetingDay === "F" && "Fri"}
                {meetingDay === "S" && "Sat"}
                {meetingDay === "U" && "Sun"}
                {" "}
            </span>
        )}
        {startTime ? (
            startTime < 1000 ? (
                <span>
                    {startTime.slice(1, 2)}:{startTime.slice(2)}
                </span>
            ) : (
                <span>
                    {startTime.slice(0, 2)}:{startTime.slice(2)}
                </span>
            )
        ) : (
            <span></span>
        )}
        {endTime ? (
            endTime < 1000 ? (
                <span>
                    -{endTime.slice(1, 2)}:{endTime.slice(2)}
                </span>
            ) : (
                <span>
                    -{endTime.slice(0, 2)}:{endTime.slice(2)}
                </span>
            )
        ) : (
            <span></span>
        )}
      </p>
      <p className="col-span-5 text-center overflow-x-auto">{campusName}</p>
    </div>
  );
};

export default MeetingTimes;
