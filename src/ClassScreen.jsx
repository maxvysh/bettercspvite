import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import SelectedCourses from "./components/SelectedCourses";
import SubjectSelector from "./components/SubjectSelector";
// import { useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useContext } from "react";
import ClassRow from "./components/ClassRow";
import AppContext from "./AppContext";
import CoreCodeSort from "./components/CoreCodeSort";
import LoadingSkeleton from "./components/LoadingSkeleton";

const ClassScreen = () => {
  // const location = useLocation();
  // const { campus, semester } = location.state;
  // const [level, setLevel] = useState("U");
  const [subject, setSubject] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [subjectDataOriginal, setSubjectDataOriginal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCores, setSelectedCores] = useState([]);
  const [isOnlineChecked, setIsOnlineChecked] = useState(false);
  const [subjectArray, setSubjectArray] = useState([]);
  // const [selectedCourses, setSelectedCourses] = useState([]);
  // const [totalCredits, setTotalCredits] = useState(0);
  // const [isDataFetched, setIsDataFetched] = useState(false);

  const {
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
  } = useContext(AppContext);

  const handleLevelSelectorChange = (value) => {
    setLevel(value);
  };

  const handleSubjectChange = (newValue) => {
    setSubject(newValue);
  };

  useEffect(() => {
    if (!campus || !semester) {
      fetchCampusSemester();
    } else {
      setIsLoading(true);

      if (subject == "all") { // If user wants to display all classes
        fetch(`${import.meta.env.VITE_BACKEND_URL}/allcourses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campus: campus,
            semester: semester,
            level: level,
            subjectArray: subjectArray,
          }),
        })
          .then((response) => response.text())
          .then((data) => {
            let parsedData = JSON.parse(data);
            parsedData = parsedData.filter((subject) =>
              subject.sections.some((section) => section.printed === "Y")
            );

            setSubjectData(parsedData);
            setSubjectDataOriginal(parsedData);
          })
          .then(() => setIsLoading(false))
          .catch((error) => console.error("Error:", error));
      } else { // If user wants to display classes for a specific subject
        fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/courses?subject=${subject}&semester=${semester}&campus=${campus}&level=${level}`
        )
          .then((response) => response.text())
          .then((data) => {
            // Filter out the classes which have no printed sections
            let parsedData = JSON.parse(data);
            parsedData = parsedData.filter((subject) =>
              subject.sections.some((section) => section.printed === "Y")
            );

            setSubjectData(parsedData);
            setSubjectDataOriginal(parsedData);
          })
          .then(() => setIsLoading(false))
          .catch((error) => console.error("Error:", error));
      }
    }
  }, [campus, semester, level, subject]);

  const onValueChange = (value) => {
    setSelectedCores(value);
  };

  const onCheckBoxChange = (value) => {
    setIsOnlineChecked(value);
  };

  useEffect(() => {
    if (!subjectData) return;
    if (!isOnlineChecked) {
      setSubjectData(subjectDataOriginal);
      return;
    }
    const filteredData = subjectData.filter((subject) =>
      subject.sections.some(
        (section) =>
          section.printed === "Y" &&
          section.meetingTimes.some(
            (meetingTime) => meetingTime.campusLocation === "O"
          )
      )
    );

    setSubjectData(filteredData);
  }, [isOnlineChecked, subjectDataOriginal]);

  useEffect(() => {
    // When the selectedCores change, filter the subjectData
    if (!subjectData) return;
    if (selectedCores.length === 0) {
      setSubjectData(subjectDataOriginal);
      return;
    }
    const filteredData = subjectData.filter((subject) =>
      selectedCores.every((selectedCore) =>
        subject.coreCodes.some((coreCode) => coreCode.code === selectedCore)
      )
    );

    setSubjectData(filteredData);
  }, [selectedCores, subjectDataOriginal]);

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
          <CoreCodeSort
            onValueChange={onValueChange}
            onCheckBoxChange={onCheckBoxChange}
          />
        </div>
        <div className="ml-4 w-full">
          <div className="flex justify-between w-[640px]">
            <SubjectSelector
              campus={campus}
              semester={semester}
              level={level}
              onValueChange={handleSubjectChange}
              setSubjectArray={setSubjectArray}
            />
            <Select onValueChange={handleLevelSelectorChange}>
              <SelectTrigger className="w-[180px] border-2">
                <SelectValue defaultValue="U" placeholder="Undergraduate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="U">Undergraduate</SelectItem>
                <SelectItem value="G">Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            {isLoading ? (
              <div className="mt-2">
                <LoadingSkeleton />
              </div>
            ) : subjectData.length === 0 && subject ? (
              <p>No entries found matching the filters</p>
            ) : (
              subjectData.map((subjectData, key) => (
                <ClassRow
                  key={key}
                  courseFD={subjectData}
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

export default ClassScreen;
