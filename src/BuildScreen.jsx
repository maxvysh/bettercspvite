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
import PrintRegister from "./components/PrintRegister";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { buildSchedules } from "./scripts/builder";

const BuildScreen = () => {
  const {
    indexTimes,
    selectedIndexes,
    subjectData,
    selectedIndexesMap,
    setSelectedIndexesMap,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [buildIndexes, setBuildIndexes] = useState([]); // Every possible combination of indexes
  const [currentIndexes, setCurrentIndexes] = useState([]); // Current indexes that are displayed
  const [indexData, setIndexData] = useState([]); // The data for the displayed indexes
  const [displayList, setDisplayList] = useState(true);
  const [currentBuild, setCurrentBuild] = useState(0);
  const [eventsByDay, setEventsByDay] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });
  const [inputName, setInputName] = useState("");
  const [savedButton, setSavedButton] = useState(false);

  // useEffect(() => {
  //   console.log("buildIndexes", buildIndexes);
  //   console.log('selectedIndexes', selectedIndexes);
  //   console.log('selectedIndexesMap', selectedIndexesMap);
  //   console.log("currentIndexes", currentIndexes);
  //   console.log("indexData", indexData);
  // }, [buildIndexes, currentIndexes, indexData]);

  const serializeIndexTimes = (indexTimes) => {
    const indexTimesObject = {};
    indexTimes.forEach((value, key) => {
      // Assuming value is an object with a meetingTimes array of objects
      const serializedValue = {
        ...value, // Spread other properties of the value object
        meetingTimes: value.meetingTimes.map((meetingTime) => ({
          // Map each meetingTime object to a new object, ensuring all properties are included
          ...meetingTime,
        })),
      };
      indexTimesObject[key] = serializedValue;
    });
    return indexTimesObject;
  };

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
  }, [currentIndexes]);

  useEffect(() => {
    setCurrentIndexes(buildIndexes[0]);
  }, [buildIndexes]);

  useEffect(() => {
    setCurrentIndexes(buildIndexes[currentBuild]);
  }, [currentBuild, buildIndexes]);

  useEffect(() => {
    if (selectedIndexes.length === 0 || indexTimes.length === 0) {
      return;
    }

    const selectedIndexesArray = Array.from(selectedIndexes);

    // Convert HashMap to Object
    const indexTimesObject = serializeIndexTimes(indexTimes);

    // Ensure the arrays are finalized before making the fetch call
    if (selectedIndexesArray && indexTimesObject) {
      setBuildIndexes(buildSchedules(selectedIndexesArray, indexTimesObject));
    }
  }, [selectedIndexes, indexTimes]);

  // useEffect(() => {
  //   console.log("buildIndexes", buildIndexes);
  // }, [buildIndexes]);

  const handleNext = () => {
    if (currentBuild < buildIndexes.length - 1) {
      setCurrentBuild(currentBuild + 1);
    } else if (currentBuild === buildIndexes.length - 1) {
      const oldNumberOfSchedules = buildIndexes.length;
      const newSchedules = buildSchedules(
        Array.from(selectedIndexes),
        serializeIndexTimes(indexTimes)
      );

      let uniqueSchedules = new Set(
        buildIndexes.map((schedule) => JSON.stringify(schedule))
      );
      // Make sure that none of the new schedules are duplicates
      for (const schedule of newSchedules) {
        const scheduleStr = JSON.stringify(schedule);
        if (!uniqueSchedules.has(scheduleStr)) {
          uniqueSchedules.add(scheduleStr);
        }
      }
      const uniqueSchedulesArray = Array.from(uniqueSchedules).map((schedule) =>
        JSON.parse(schedule)
      );
      const newNumberOfSchedules = uniqueSchedulesArray.length;
      setBuildIndexes(uniqueSchedulesArray);

      // If new schedules are generated, increment the currentBuild
      if (newNumberOfSchedules > oldNumberOfSchedules) {
        setCurrentBuild(currentBuild + 1);
      }
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
      // console.error("Invalid time input:", time);
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

  useEffect(() => {
    // console.log("dataawawd", indexData);
    // console.log("sub addata", subjectData);
  }, [indexData]);

  // const assignCourseNumbers = (currentIndexes) => {
  //   let courseMap = new Map();
  //   for (const index of currentIndexes) {
  //     const courseNumber = selectedIndexesMap.get(index);
  //     courseMap.set(index, courseNumber);
  //   }
  // };

  const handleSave = (name, currentIndexes) => {
    // Create the schedule object
    const schedule = {};
    currentIndexes.forEach((index) => {
      schedule[index] = selectedIndexesMap.get(index);
    });

    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/saveschedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        schedule: schedule,
      }),
    })
      .then(() => {
        console.log("Saved!");
        setSavedButton(true);
        setTimeout(() => {
          setSavedButton(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
            <div className="m-1 flex gap-1 h-12">
              {/* <Textarea className="h-12" /> */}
              <input
                type="text"
                placeholder="Enter name"
                className="border-2 border-[#090E1B] rounded-lg w-full p-2"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
              {savedButton ? (
                <Button className="w-12 h-full bg-green-500 hover:bg-green-500 cursor-default">
                  Saved!
                </Button>
              ) : (
                <Button
                  className="w-12 h-full"
                  onClick={() => handleSave(inputName, currentIndexes)}
                >
                  Save
                </Button>
              )}
            </div>
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
          </Card>
          <PrintRegister
            indexData={indexData}
            eventsByDay={eventsByDay}
            currentIndexes={currentIndexes}
          />
        </div>
        {displayList ? (
          <div className="ml-4 w-full">
            {isLoading ? (
              <LoadingSkeleton />
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
                        sectionEligibility={sectionData.sectionEligibility}
                        sectionNotes={sectionData.sectionNotes}
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
              <LoadingSkeleton />
            ) : (
              <Calendar eventsByDay={eventsByDay} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildScreen;
