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
  const [subjectDataOriginal, setSubjectDataOriginal] = useState(null);
  const [subjectDataFiltered, setSubjectDataFiltered] = useState(null);
  const [sectionStatusOpen, setSectionStatusOpen] = useState(true);
  const [sectionStatusClosed, setSectionStatusClosed] = useState(true);

  useEffect(() => {
    if (subjectData) {
      setIsLoading(false);
      // Filter the subject data to only have sections that have printed === "Y"
      let filteredData = subjectData.map((subject) => ({
        ...subject,
        sections: subject.sections.filter((section) => section.printed === "Y"),
      }));
      setSubjectDataOriginal(filteredData);
      setSubjectDataFiltered(filteredData);
    }
  }, [subjectData]);

  useEffect(() => {
    console.log("sectionStatusOpen", sectionStatusOpen);
    console.log("sectionStatusClosed", sectionStatusClosed);
    if (!subjectDataOriginal) return;

    let newFilteredData = subjectDataOriginal.map((subject) => ({
      ...subject,
      sections: subject.sections.filter(
        (section) =>
          (section.openStatus === true && sectionStatusOpen) ||
          (section.openStatus === false && sectionStatusClosed)
      ),
    }));

    setSubjectDataFiltered(newFilteredData);
  }, [sectionStatusOpen, sectionStatusClosed, subjectDataOriginal]);

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
            <SectionStatus
              sectionStatusOpen={sectionStatusOpen}
              sectionStatusClosed={sectionStatusClosed}
              setSectionStatusOpen={setSectionStatusOpen}
              setSectionStatusClosed={setSectionStatusClosed}
            />
            <CourseTypes />
            <DayAndTime />
          </div>
        </div>
        <div className="ml-4 w-full">
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              subjectDataFiltered.map((subjectData) => (
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
