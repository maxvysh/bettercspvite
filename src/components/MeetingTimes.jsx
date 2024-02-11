
const MeetingTimes = ({ meetingDay, startTime, endTime, campusName }) => {
  return (
    <div className="flex">
      <p>
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
      <p>{campusName}</p>
    </div>
  );
};

export default MeetingTimes;
