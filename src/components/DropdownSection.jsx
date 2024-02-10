import MeetingTimes from "./MeetingTimes";

const DropdownSection = ({ section, openStatus, index, meetingTimes }) => {
return (
    <div>
        <p>key: {section + 1 < 10 ? <span>0{section + 1}</span> : <span>{section + 1}</span>}</p>
        <p>openStatus: {openStatus ? <span>OPEN</span> : <span>CLOSED</span>}</p>
        <p>index: {index}</p>
        <div>
            {meetingTimes.map((time, index) => (
                <MeetingTimes key={index} meetingDay={time.meetingDay} />
            ))}
        </div>
    </div>
);
};

export default DropdownSection;
