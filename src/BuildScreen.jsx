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

const BuildScreen = () => {
  const {
    selectedCourses,
    setSelectedCourses,
    totalCredits,
    setTotalCredits,
    semester,
    campus,
    level,
    fetchCampusSemester,
    indexTimes,
    setIndexTimes,
    selectedIndexes,
    subjectData,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [buildIndexes, setBuildIndexes] = useState([]);
  const [currentIndexes, setCurrentIndexes] = useState([]);
  const [indexData, setIndexData] = useState([]);
  const [displayList, setDisplayList] = useState(true);
  const [currentBuild, setCurrentBuild] = useState(0);
  const [eventsByDay, setEventsByDay] = useState({});

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
    for (const course of subjectData) {
      let useTitle = course.expandedTitle;
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
  }, [currentBuild]);

  useEffect(() => {
    // console.log("posting selected Indexes", selectedIndexes);
    // console.log("posting indexTimes", indexTimes);
    // console.log("posting subjectData", subjectData);
    if (selectedIndexes.length === 0 || indexTimes.length === 0) {
      return;
    }
    const selectedIndexesArray = Array.from(selectedIndexes);

    // Convert HashMap to Object
    const indexTimesObject = serializeIndexTimes(indexTimes);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/buildschedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedIndexes: selectedIndexesArray,
        indexTimes: indexTimesObject,
      }),
    }).then((response) => {
      response.json().then((data) => {
        setBuildIndexes(data);
      });
    });
  }, [selectedIndexes, indexTimes]);

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

  // const getBackgroundColor = (campus) => {

  // };

  const convertTimeTo24HourFormat = (time, amPmCode) => {
    console.log("time", time);
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
    const events = indexData.reduce((acc, sectionData) => {
      sectionData.meetingTimes.forEach((meetingTime) => {
        const day = getFullDayName(meetingTime.meetingDay);
        const startTime = convertTimeTo24HourFormat(
          meetingTime.startTime,
          meetingTime.pmCode
        ); // Assuming convertTimeTo24HourFormat function exists and pmCode is the AM/PM indicator
        const endTime = convertTimeTo24HourFormat(
          meetingTime.endTime,
          meetingTime.pmCode
        ); // Same assumption as above
        const name = sectionData.useTitle;
        const type = "custom";
        acc[day] = [
          ...(acc[day] || []),
          {
            id: sectionData.index,
            name,
            type,
            startTime,
            endTime,
          },
        ];
      });
      return acc;
    }, {});
    setEventsByDay(events);
  }, [indexData]);

  useEffect(() => {
    console.log("dataawawd", indexData);
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
          <Card className="flex justify-between border-2">
            <Button className="w-24 m-1" onClick={() => handlePrev()}>Prev</Button>
            <div className="flex flex-col justify-center">
              <p className="h-fit">
                {currentBuild + 1} of {buildIndexes.length}
              </p>
            </div>
            <Button className="w-24 m-1" onClick={() => handleNext()}>Next</Button>
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
              <Timetable events={eventsByDay} style={{ height: "500px" }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildScreen;
