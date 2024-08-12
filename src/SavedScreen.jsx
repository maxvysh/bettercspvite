import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import ListViewRow from "./components/ListViewRow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BuildSelector from "./components/BuildSelector";
import { parseISO } from "date-fns";
import Calendar from "./components/Calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import edit from "./assets/edit.svg";
import xcircle from "./assets/x-circle-white.svg";
import PrintRegister from "./components/PrintRegister";

const SavedScreen = () => {
  const { campus, semester, level, fetchCampusSemester } =
    useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
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
  const [totalBuilds, setTotalBuilds] = useState(0);
  const [savedSchedules, setSavedSchedules] = useState([]);
  const [currentSchedule, setCurrentSchedule] = useState({});
  const [currentIndexes, setCurrentIndexes] = useState([]);

  // Retrieve the saved schedules from the backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/savedschedules`)
      .then((response) => response.json())
      .then((data) => {
        setSavedSchedules(data);
        setTotalBuilds(data.length);
        setCurrentSchedule(data[0]);
        setCurrentName(data[0].name);
      })
      .catch((error) => {
        console.error("Error fetching saved schedules:", error);
      });
  }, []);

  useEffect(() => {
    console.log("indexData", indexData);
  }, [indexData]);

  useEffect(() => {
    console.log("currentIndexes", currentIndexes);
  }, [currentIndexes]);

  // useEffect(() => {
  //   // Update currentIndexes
  //   if (!currentSchedule) return;
  //   const newIndexes = [];
  //   for (const schedule of currentSchedule.schedule) {
  //     newIndexes.push(...schedule.indexes);
  //   }
  //   setCurrentIndexes(newIndexes);
  // }, [currentSchedule]);

  // From the data retrived in dataByCourseNumber, find the section data that matches the index
  const dataByIndex = (index, courseNumberData) => {
    for (const course of courseNumberData) {
      const matchingSection = course.sections.find(
        (section) => section.index === index
      );
      if (matchingSection) {
        let useTitle = "unknown";
        if (course.expandedTitle && course.expandedTitle.trim() !== "") {
          useTitle = course.expandedTitle;
        } else {
          useTitle = course.title;
        }
        matchingSection.useTitle = useTitle; // Add the course name to the matching section data
        return matchingSection; // Return the matching section data
      }
    }

    return null; // Return null if no matching section is found
  };

  // Get all the data of courses, including all the sections within from the courseNumber
  const dataByCourseNumber = async (courseNumber) => {
    if (!campus || !semester) {
      await fetchCampusSemester();
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/courses?subject=${courseNumber}&semester=${semester}&campus=${campus}&level=${level}`
      );
      const data = await response.text();
      return JSON.parse(data);
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  // Fetch the data for each index in the current schedule
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (currentSchedule.name !== undefined) {
        setIndexData([]); // Clear the indexData array before fetching new data
        const indexes = []; // Local array to accumulate indexes
        const newIndexData = []; // Local array to accumulate new data

        // Outer promises array to handle fetching data for each schedule
        const promises = currentSchedule.schedule.map(async (schedule) => {
          // Fetch the course number data
          const courseNumberData = await dataByCourseNumber(
            schedule.courseNumber
          );
          if (courseNumberData) {
            // Inner promises array to handle fetching data for each index
            const indexPromises = schedule.indexes.map(async (index) => {
              indexes.push(index);
              const sectionData = await dataByIndex(index, courseNumberData);
              if (sectionData) {
                newIndexData.push(sectionData); // Accumulate data in the local array
              }
            });
            await Promise.all(indexPromises); // Wait for all index data to be fetched
          }
        });

        await Promise.all(promises); // Wait for all schedule data to be fetched

        setIndexData(newIndexData); // Set the state with the accumulated data
        setCurrentIndexes(indexes); // Set the state with the accumulated indexes
      }

      setIsLoading(false);
    };

    fetchData();
  }, [currentSchedule]);

  useEffect(() => {
    if (savedSchedules.length > 0) {
      setCurrentSchedule(savedSchedules[currentBuild]);
      setCurrentName(savedSchedules[currentBuild].name);
    }
  }, [currentBuild]);

  const handleNext = () => {
    if (currentBuild < totalBuilds - 1) {
      setCurrentBuild(currentBuild + 1);
    }
  };

  const handlePrev = () => {
    if (currentBuild > 0) {
      setCurrentBuild(currentBuild - 1);
    }
  };

  const handleEdit = () => {
    console.log(currentSchedule);
  };

  // Delete the current schedule from the saved schedules and update the backend
  const handleDelete = () => {
    console.log("delete name");
    const newSavedSchedules = savedSchedules.filter(
      (schedule) => schedule.name !== currentSchedule.name
    );
    setSavedSchedules(newSavedSchedules);
    setTotalBuilds(newSavedSchedules.length);
    setCurrentBuild(0);
    setCurrentSchedule(newSavedSchedules[0]);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/savedschedules`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentSchedule._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted schedule:", data);
      })
      .catch((error) => {
        console.error("Error deleting schedule:", error);
      });
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
              <Button
                className="w-24 m-1 border-2"
                onClick={() => handlePrev()}
              >
                Prev
              </Button>
              <div className="flex flex-col justify-center">
                <p className="h-fit">
                  {currentBuild + 1} of {totalBuilds}
                </p>
              </div>
              <Button
                className="w-24 m-1 border-2"
                onClick={() => handleNext()}
              >
                Next
              </Button>
            </div>
            <Card className="flex justify-center items-center mx-2.5 h-8">
              <p>{currentName}</p>
            </Card>
            <div>
              <ScrollArea className="max-h-[200px]">
                <ScrollBar />
                <div className="flex flex-col gap-1 p-2.5">
                  {savedSchedules.map((schedule, index) => (
                    <div key={index} className="flex rounded-lg border-2">
                      <Button
                        className="w-full rounded-r-none"
                        onClick={() => {
                          setCurrentBuild(index);
                        }}
                      >
                        {schedule.name}
                      </Button>
                      <Button className="rounded-none">
                        <img
                          src={edit}
                          alt="Edit"
                          className="w-10"
                          onClick={handleEdit}
                        />
                      </Button>
                      <Button className="rounded-l-none">
                        <img
                          src={xcircle}
                          alt="Delete"
                          className="w-10"
                          onClick={handleDelete}
                        />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>
          <PrintRegister indexData={indexData} eventsByDay={eventsByDay} currentIndexes={currentIndexes} />
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
