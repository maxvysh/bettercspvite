import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ClassScreen from "./ClassScreen";
import SelectCS from "./SelectCS";
import SectionScreen from "./SectionScreen";
import AppContext from './AppContext';
import { useState } from 'react';

const App = () => {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);

  return (
    <AppContext.Provider value={{
      selectedCampus,
      setSelectedCampus,
      selectedSemester,
      setSelectedSemester,
      selectedCourses,
      setSelectedCourses,
      totalCredits,
      setTotalCredits
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