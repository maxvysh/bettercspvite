import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import ListViewRow from "./components/ListViewRow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BuildSelector from "./components/BuildSelector";
import Timetable from "@maxvysh/react-timetable-events";
import { parseISO } from "date-fns";
import Calendar from "./components/Calendar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const SavedScreen = () => {
  const { subjectData } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [currentIndexes, setCurrentIndexes] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [indexData, setIndexData] = useState([]);
  const [displayList, setDisplayList] = useState(true);
  const [currentBuild, setCurrentBuild] = useState(0);
  const [eventsByDay, setEventsByDay] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });
  const [buildIndexes, setBuildIndexes] = useState([]);
  const [savedSchedules, setSavedSchedules] = useState([]);

  useEffect(() => {
    console.log("fetching saved schedules");
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/savedschedules`)
      .then((response) => response.json())
      .then((data) => {
        setSavedSchedules(data);
        if (data.length > 0) {
          setBuildIndexes(data.map((schedule) => schedule.schedule));
          setCurrentIndexes(data[currentBuild].schedule);
          setCurrentName(data[currentBuild].name);
        }
      })
      .catch((error) => {
        console.error("Error fetching saved schedules:", error);
      });
  }, []);

  const dataByIndex = (index) => {
    // Assuming subjectData is accessible in this scope
    let useTitle;
    for (const course of subjectData) {
      if (course.expandedTitle && course.expandedTitle.trim() !== "") {
        useTitle = course.expandedTitle;
      } else {
        useTitle = course.title;
      }

      const matchingSection = course.sections.find(
        (section) => section.index === index
      );
      if (matchingSection) {
        matchingSection.useTitle = useTitle; // Add the course name to the matching section data
        return matchingSection; // Return the matching section data
      }
    }

    return null; // Return null if no matching section is found
  };

  useEffect(() => {
    setIndexData([]); // Clear the indexData array before fetching new data
    if (Array.isArray(currentIndexes)) {
      // Ensure currentIndexes is an array
      currentIndexes.forEach((index) => {
        const sectionData = dataByIndex(index);
        if (sectionData) {
          setIndexData((prevData) => [...prevData, sectionData]);
        }
      });
    }

    setIsLoading(false);
  }, [currentIndexes, subjectData]);

  // useEffect(() => {
  //   setCurrentIndexes(buildIndexes[0]);
  // }, [buildIndexes]);

  useEffect(() => {
    setCurrentIndexes(buildIndexes[currentBuild]);
    if (savedSchedules.length > 0) {
      setCurrentName(savedSchedules[currentBuild].name);
    }
  }, [currentBuild, buildIndexes]);

  const handleNext = () => {
    if (currentBuild < buildIndexes.length - 1) {
      setCurrentBuild(currentBuild + 1);
    }
  };

  const handlePrev = () => {
    if (currentBuild > 0) {
      setCurrentBuild(currentBuild - 1);
    }
  };

  const getFullDayName = (dayLetter) => {
    const dayMap = {
      M: "monday",
      T: "tuesday",
      W: "wednesday",
      TH: "thursday",
      F: "friday",
      S: "saturday",
      SU: "sunday",
    };
    return dayMap[dayLetter] || "Unknown"; // Returns "Unknown" if the dayLetter is not found in the map
  };

  const getBackgroundColor = (campus) => {
    const campusColorMap = {
      ONLINE: "#ff8081",
      BUSCH: "#cdeeff",
      "COLLEGE AVENUE": "#ffffcb",
      "COOK DOUGLASS": "#ddffdd",
      LIVINGSTON: "#ffcb98",
      DOWNTOWN: "#ffd7ee",
      CAMDEN: "#e3bfff",
      NEWARK: "#edeedc",
    };

    return campusColorMap[campus] || "#dddddd";
  };

  const convertTimeTo24HourFormat = (time, amPmCode) => {
    if (!time) {
      // Handle the null or undefined case
      console.error("Invalid time input:", time);
      return ""; // or any default value you prefer
    }
    // Parse the time into hours and minutes
    let hours = parseInt(time.slice(0, 2), 10);
    const minutes = time.slice(2);

    // Convert hours based on the AM/PM code
    if (amPmCode === "P" && hours < 12) {
      hours += 12; // Convert PM hours to 24-hour format
    } else if (amPmCode === "A" && hours === 12) {
      hours = 0; // Convert 12AM to 00 hours
    }

    // Format the hours and minutes to ensure two digits
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.padStart(2, "0");

    const ISOtime = parseISO(
      `2024-02-23T${formattedHours}:${formattedMinutes}:00`
    ); // Assuming parseISO function exists
    // Return the time in 24-hour format
    return ISOtime;
  };

  useEffect(() => {
    let id = 0;
    // Step 1: Initialize a template object with the days of the week in order
    const eventsTemplate = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    };

    // Step 2: Populate the template with events data
    const events = indexData.reduce((acc, sectionData) => {
      sectionData.meetingTimes.forEach((meetingTime) => {
        const day = getFullDayName(meetingTime.meetingDay);
        const startTime = convertTimeTo24HourFormat(
          meetingTime.startTime,
          meetingTime.pmCode
        );
        const endTime = convertTimeTo24HourFormat(
          meetingTime.endTime,
          meetingTime.pmCode
        );
        const name = sectionData.useTitle;
        const type = "custom";
        const backgroundColor = getBackgroundColor(meetingTime.campusName);
        const closed = !sectionData.openStatus;
        if (acc[day]) {
          // Ensure the day exists in the template before adding the event
          acc[day].push({
            id: id++,
            name,
            type,
            startTime,
            endTime,
            backgroundColor,
            closed,
          });
        }
      });
      return acc;
    }, eventsTemplate); // Use the template as the initial value for the accumulator

    // Step 5: Update the state
    setEventsByDay(events);
  }, [indexData]);

  return (
    <div>
      <div className="min-w-[1570px]">
        <Header />
      </div>
      <div className="p-3 flex">
        <div className="w-[330px] min-w-[330px] flex flex-col gap-4">
          <ScreenSelector />
          <BuildSelector
            displayList={displayList}
            setDisplayList={setDisplayList}
          />
          <Card className="border-2 flex flex-col gap-1">
            <div className="flex justify-between">
              <Button className="w-24 m-1" onClick={() => handlePrev()}>
                Prev
              </Button>
              <div className="flex flex-col justify-center">
                <p className="h-fit">
                  {currentBuild + 1} of {buildIndexes.length}
                </p>
              </div>
              <Button className="w-24 m-1" onClick={() => handleNext()}>
                Next
              </Button>
            </div>
            <div>
              <p>{currentName}</p>
            </div>
            <div>
              <ScrollArea className="h-[200px]">
                <ScrollBar />
                  <div className="flex flex-col gap-1 pr-2.5">
                    {savedSchedules.map((schedule, index) => (
                      <Button
                        key={index}
                        className="w-full"
                        onClick={() => {
                          setCurrentBuild(index);
                        }}
                      >
                        {schedule.name}
                      </Button>
                    ))}
                  </div>
              </ScrollArea>
            </div>
          </Card>
        </div>
        {displayList ? (
          <div className="ml-4 w-full">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              // For each index in buildIndexes, run the dataByIndex function to get the section data
              // Then pass the section data to the ListViewRow component
              <Card className="border-2 min-w-[1200px] w-full">
                <div className="grid grid-cols-8 w-full mx-2">
                  <p className="col-span-1 text-center">title</p>
                  <p className="col-span-1 text-center">section</p>
                  <p className="col-span-1 text-center">status</p>
                  <p className="col-span-1 text-center">index</p>
                  <p className="col-span-2 text-center">
                    meeting times/locations
                  </p>
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
            )}
          </div>
        ) : (
          <div className="ml-4 w-full">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <Calendar eventsByDay={eventsByDay} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedScreen;
