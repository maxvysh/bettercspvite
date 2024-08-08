import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import SelectedCourses from "./components/SelectedCourses";
import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import ClassRowSec from "./components/ClassRowSec";
import SectionStatus from "./components/SectionStatus";
import CourseTypes from "./components/CourseTypes";
import DayAndTime from "./components/DayAndTime";

const SectionScreen = () => {
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
    subjectData,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (subjectData) {
      setIsLoading(false);
    }
  }, [subjectData]);

  return (
    <div>
      <div className="min-w-[1570px]">
        <Header />
      </div>
      <div className="p-3 flex">
        <div className="w-[330px] min-w-[330px] flex flex-col gap-2">
          <ScreenSelector />
            <SelectedCourses
              selectedCourses={selectedCourses}
              setSelectedCourses={setSelectedCourses}
              totalCredits={totalCredits}
              setTotalCredits={setTotalCredits}
            />
            <div id="filters">
              <SectionStatus />
              <CourseTypes />
              <DayAndTime />
            </div>
        </div>
        <div className="ml-4 w-full">
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              subjectData
                .filter((subject) =>
                  subject.sections.some((section) => section.printed === "Y")
                )
                .map((subjectData) => (
                  <ClassRowSec
                    key={subjectData.courseNumber + subjectData.campusCode}
                    offeringUnitCode={subjectData.offeringUnitCode}
                    subject={subjectData.subject}
                    courseNumber={subjectData.courseNumber}
                    expandedTitle={subjectData.expandedTitle}
                    title={subjectData.title}
                    credits={subjectData.credits}
                    sections={subjectData.sections}
                    openSections={
                      subjectData.sections.filter(
                        (section) =>
                          section.printed === "Y" && section.openStatus === true
                      ).length
                    }
                    totalSections={
                      subjectData.sections.filter(
                        (section) => section.printed === "Y"
                      ).length
                    }
                    preReqNotes={subjectData.preReqNotes}
                    selectedCourses={selectedCourses}
                    setSelectedCourses={setSelectedCourses}
                    totalCredits={totalCredits}
                    setTotalCredits={setTotalCredits}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionScreen;
