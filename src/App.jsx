import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ClassScreen from "./ClassScreen";
import SelectCS from "./SelectCS";
import SectionScreen from "./SectionScreen";
import AppContext from './AppContext';
import { useState, useEffect } from 'react';

const App = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [campus, setCampus] = useState(null);
  const [semester, setSemester] = useState(null);
  const [level, setLevel] = useState("U");

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
    if (!isDataFetched) return;
    if (isFirstFetch) {
      setIsFirstFetch(false);
      return;
    }
    console.log("posting selected courses", selectedCourses);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedCourses),
    });
  }, [selectedCourses]);

  return (
    <AppContext.Provider value={{
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
      fetchCampusSemester
    }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path ="/selectcs" element={<SelectCS />} />
          <Route path="/classes" element={<ClassScreen />} />
          <Route path="/sections" element={<SectionScreen />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App;