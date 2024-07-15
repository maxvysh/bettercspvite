import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import ListViewRow from "./components/ListViewRow";
import { Card } from "@/components/ui/card";

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
    console.log("settinmg is loading to false");
    // Set the component to rerender

    return null; // Return null if no matching section is found
  };

  useEffect(() => {
    console.log(
      "AAAAAAJHDBASJBDJHABSJDBAJHSDBJHASBDJHBASDJBJDHAS",
      currentIndexes
    );
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
    console.log("buildIndexes", buildIndexes);
    setCurrentIndexes(buildIndexes[0]);
    console.log("currentIndexes", currentIndexes);
  }, [buildIndexes]);

  useEffect(() => {
    // console.log("posting selected Indexes", selectedIndexes);
    // console.log("posting indexTimes", indexTimes);
    // console.log("posting subjectData", subjectData);
    if (selectedIndexes.length === 0 || indexTimes.length === 0) {
      return;
    }
    console.log("running fetch");
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

  return (
    <div>
      <div className="min-w-[1570px]">
        <Header />
      </div>
      <div className="p-3 flex">
        <div className="w-[330px] min-w-[330px]">
          <ScreenSelector />
        </div>
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
      </div>
    </div>
  );
};

export default BuildScreen;
