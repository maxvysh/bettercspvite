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
    setSelectedIndexes,
    subjectData,
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [subjectDataOriginal, setSubjectDataOriginal] = useState(null);
  const [subjectDataFiltered, setSubjectDataFiltered] = useState(null);
  const [sectionStatusOpen, setSectionStatusOpen] = useState(true);
  const [sectionStatusClosed, setSectionStatusClosed] = useState(true);
  const [traditionalType, setTraditionalType] = useState(true);
  const [hybridType, setHybridType] = useState(true);
  const [onlineType, setOnlineType] = useState(true);
  const [addTimeButtonPressed, setAddTimeButtonPressed] = useState(false);
  const [selectedFromTime, setSelectedFromTime] = useState(null);
  const [selectedToTime, setSelectedToTime] = useState(null);
  const [isValidTimeRange, setIsValidTimeRange] = useState(false);

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
    if (!subjectDataOriginal) return;

    console.log("filtering data", subjectDataOriginal);

    let newFilteredData = subjectDataOriginal.map((subject) => ({
      ...subject,
      sections: subject.sections.filter(
        (section) =>
          ((section.openStatus === true && sectionStatusOpen) ||
            (section.openStatus === false && sectionStatusClosed)) &&
          ((traditionalType &&
            section.meetingTimes.every(
              (meetingTime) => meetingTime.campusLocation !== "O"
            )) ||
            (hybridType &&
              section.meetingTimes.some(
                (meetingTime) => meetingTime.campusLocation === "O"
              ) &&
              section.meetingTimes.some(
                (meetingTime) => meetingTime.campusLocation !== "O"
              )) ||
            (onlineType &&
              section.meetingTimes.every(
                (meetingTime) => meetingTime.campusLocation === "O"
              )))
      ),
    }));

    console.log("newFilteredData", newFilteredData);
    setSubjectDataFiltered(newFilteredData);
  }, [
    sectionStatusOpen,
    sectionStatusClosed,
    traditionalType,
    hybridType,
    onlineType,
    subjectDataOriginal,
  ]);

  // Update selectedIndexes when subjectDataFiltered changes
  useEffect(() => {
    if (!subjectDataFiltered) return;
    setSelectedIndexes(
      subjectDataFiltered.reduce((acc, subject) => {
        subject.sections.forEach((section) => {
          acc.add(section.index);
        });
        return acc;
      }, new Set())
    );
  }, [subjectDataFiltered, setSelectedIndexes]);

  useEffect(() => {
    console.log("selectedFromTime", selectedFromTime);  
    console.log("selectedToTime", selectedToTime);
    if (selectedFromTime && selectedToTime) {
      if (selectedFromTime > selectedToTime) {
        setIsValidTimeRange(false);
      } else {
        setIsValidTimeRange(true);
      }
    }

    console.log("isValidTimeRange", isValidTimeRange);
  }, [selectedFromTime, selectedToTime]);

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
              setSectionStatusOpen={setSectionStatusOpen}
              sectionStatusClosed={sectionStatusClosed}
              setSectionStatusClosed={setSectionStatusClosed}
            />
            <CourseTypes
              traditionalType={traditionalType}
              setTraditionalType={setTraditionalType}
              hybridType={hybridType}
              setHybridType={setHybridType}
              onlineType={onlineType}
              setOnlineType={setOnlineType}
            />
            <DayAndTime
              addTimeButtonPressed={addTimeButtonPressed}
              setAddTimeButtonPressed={setAddTimeButtonPressed}
              selectedFromTime={selectedFromTime}
              setSelectedFromTime={setSelectedFromTime}
              selectedToTime={selectedToTime}
              setSelectedToTime={setSelectedToTime}
              isValidTimeRange={isValidTimeRange}
              setIsValidTimeRange={setIsValidTimeRange}
            />
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
