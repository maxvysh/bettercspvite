import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ClassScreen from "./ClassScreen";
import SelectCS from "./SelectCS";
import BuildScreen from "./BuildScreen";
import SectionScreen from "./SectionScreen";
import SavedScreen from "./SavedScreen";
import AppContext from "./AppContext";
import About from "./About";
import NotLoggedInScreen from "./NotLoggedInScreen";
import Error404Screen from "./Error404Screen";
import { useState, useEffect } from "react";

const App = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [campus, setCampus] = useState(null);
  const [semester, setSemester] = useState(null);
  const [level, setLevel] = useState("U");
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectedIndexesMap, setSelectedIndexesMap] = useState(new Map());
  const [indexTimes, setIndexTimes] = useState([]);
  const [subjectData, setSubjectData] = useState();

  function fetchCampusSemester() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/campussemester`)
      .then((response) => response.json())
      .then((data) => {
        setCampus(data.campus);
        setSemester(data.semester);
      });
  }

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/courses`
      );
      const data = await response.json();
      if (data) {
        setSelectedCourses(data.coursesArray);
        setTotalCredits(data.totalCredits);
        setIsDataFetched(true);
      }
    }

    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!isDataFetched) return;
      if (isFirstFetch) {
        setIsFirstFetch(false);
        return;
      }

      fetch(`${import.meta.env.VITE_BACKEND_URL}/user/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedCourses),
      });
    }, 2000); // 2 seconds debounce

    return () => clearTimeout(debounce); // Cleanup on effect re-run or component unmount
  }, [selectedCourses]);

  useEffect(() => {
    if (!selectedCourses || !level || !isDataFetched) {
      return;
    }
    if (!campus || !semester) {
      fetchCampusSemester();
      return;
    }
    if (selectedCourses.length === 0) {
      setSubjectData([]);
      return;
    }
    const fetchData = async () => {
      const fetchPromises = selectedCourses.map(async (course) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/courses?subject=${
              course.subject
            }&semester=${semester}&campus=${campus}&level=${level}`
          );
          const data = await response.json();
          // Assuming data is an array of courses
          const foundCourse = data.find(
            (c) =>
              c.courseNumber === course.courseNumber &&
              c.sections.some((section) => section.printed === "Y")
          );
          return foundCourse || null; // Return found course or null if not found
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            console.error("Error fetching course data:", error);
          }
          return null; // Return null in case of error
        }
      });

      const courses = await Promise.all(fetchPromises);
      // Filter out null values (not found or error cases)
      const validCourses = courses.filter((course) => course !== null);
      setSubjectData(validCourses); // Update state with all found courses or empty array

      let selectedIndexesMap = new Map();

      // Create a map where the key is the course index and the value is the course code and meeting times
      const indexTimesMap = validCourses.reduce((acc, course) => {
        const courseCode = `${course.offeringUnitCode}${course.subject}${course.courseNumber}`;
        course.sections
          .filter((section) => section.printed === "Y")
          .forEach((section) => {
            // Initialize the array if the subject is not already a key
            selectedIndexesMap.set(section.index, course.subject);

            // Use the set method to add to the Map
            acc.set(section.index, {
              courseCode: courseCode,
              meetingTimes: section.meetingTimes,
            });
          });
        return acc;
      }, new Map());

      setIndexTimes(indexTimesMap);
      setSelectedIndexesMap(selectedIndexesMap);
    };

    fetchData();
  }, [selectedCourses, semester, campus, level]); // Add dependencies as needed

  // Update the selectedIndexes when indexTimes is set
  useEffect(() => {
    if (indexTimes.length === 0) {
      return;
    }
    const newIndexes = new Set();
    indexTimes.forEach((value, key) => {
      newIndexes.add(key);
    });
    setSelectedIndexes(newIndexes);
  }, [indexTimes]);

  // useEffect(() => {
  //   console.log("sub dat:", selectedIndexes);
  // }, [selectedIndexes]);

  // // useEffect(() => {
  // //   console.log("selectedCourses:", selectedCourses);
  // // }, [selectedCourses]);

  // // useEffect(() => {
  // //   console.log("indexTimes:", indexTimes);
  // // }, [indexTimes]);

  // useEffect(() => {
  //   console.log("selectedIndexesMap:", selectedIndexesMap);
  // }, [selectedIndexesMap]);

  // useEffect(() => {
  //   // Update the selectedIndexes
  //   const newIndexes = new Set();
  //   indexTimes.forEach((value, key) => {
  //     newIndexes.add(key);
  //   });
  //   setSelectedIndexes(newIndexes);
  // }, [selectedCourses, indexTimes]);

  // Build schedules if selectedIndexes and indexTimes are set
  // useEffect(() => {
  //   if (selectedIndexes.length > 0 && indexTimes) {
  //     fetch(`${import.meta.env.VITE_BACKEND_URL}/user/buildschedules`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         selectedIndexes,
  //         indexTimes,
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("Schedules:", data);
  //       });
  //   }
  // }, [selectedIndexes, indexTimes]);

  return (
    <AppContext.Provider
      value={{
        selectedCourses,
        setSelectedCourses,
        totalCredits,
        setTotalCredits,
        campus,
        setCampus,
        semester,
        setSemester,
        level,
        setLevel,
        fetchCampusSemester,
        selectedIndexes,
        setSelectedIndexes,
        selectedIndexesMap,
        setSelectedIndexesMap,
        indexTimes,
        setIndexTimes,
        subjectData,
      }}
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/selectcs" element={<SelectCS />} />
          <Route path="/classes" element={<ClassScreen />} />
          <Route path="/sections" element={<SectionScreen />} />
          <Route path="/build" element={<BuildScreen />} />
          <Route path="/saved" element={<SavedScreen />} />
          <Route path="/about" element={<About />} />
          <Route path="/notloggedin" element={<NotLoggedInScreen />} />
          <Route path="*" element={<Error404Screen />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
