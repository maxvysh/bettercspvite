import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import { useContext, useEffect } from "react";
import AppContext from "./AppContext";

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
  } = useContext(AppContext);

  useEffect(() => {
    console.log("posting selected courses", selectedCourses);
    console.log("posting indexTimes", indexTimes);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/user/buildschedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedCourses,
        indexTimes,
      }),
    })
  }, [selectedCourses, indexTimes]);

  return (
    <div>
      <div className="min-w-[1570px]">
        <Header />
      </div>
      <div className="p-3">
        <div className="w-[330px] min-w-[330px]">
          <ScreenSelector />
        </div>
      </div>
    </div>
  );
};

export default BuildScreen;
