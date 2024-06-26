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

const ClassScreen = () => {
  // const location = useLocation();
  // const { campus, semester } = location.state;
  // const [level, setLevel] = useState("U");
  const [subject, setSubject] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    fetchCampusSemester
  } = useContext(AppContext);

  const handleLevelSelectorChange = (value) => {
    setLevel(value);
  };

  const handleSubjectChange = (newValue) => {
    setSubject(newValue);
  };

  // Make a useEffect that runs before the component renders
  // Fetch the campussemester from the backend if it is not already in the context
  // function fetchCampusSemester() {
  //   console.log("fetching campus semester");
  //   fetch(`${import.meta.env.VITE_BACKEND_URL}/user/campussemester`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCampus(data.campus);
  //       setSemester(data.semester);
  //     });
  // }

  useEffect(() => {
    if (!campus || !semester) {
      fetchCampusSemester();
    } else {
      setIsLoading(true);
      fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/courses?subject=${subject}&semester=${semester}&campus=${campus}&level=${level}`
      )
        .then((response) => response.text())
        .then((data) => {
          setSubjectData(JSON.parse(data));
        })
        .then(() => setIsLoading(false))
        .catch((error) => console.error("Error:", error));
    }
  }, [campus, semester, level, subject]);

  // useEffect(() => {
  //   async function fetchCourses() {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BACKEND_URL}/user/courses`
  //     );
  //     const data = await response.json();
  //     if (data) {
  //       setSelectedCourses(data.coursesArray);
  //       setTotalCredits(data.totalCredits);
  //       setIsDataFetched(true);
  //     }
  //   }
  //   fetchCourses();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (!isDataFetched) return;
  //   console.log("selected courses", selectedCourses);

  //   fetch(`${import.meta.env.VITE_BACKEND_URL}/user/courses`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(selectedCourses),
  //   });
  // }, [selectedCourses]);

  return (
    <div>
      <div className="min-w-[1570px]">
        <Header />
      </div>
      <div className="p-3 flex">
        <div className="w-[330px] min-w-[330px]">
          <ScreenSelector />
          <div className="mt-4">
            <SelectedCourses
              selectedCourses={selectedCourses}
              setSelectedCourses={setSelectedCourses}
              totalCredits={totalCredits}
              setTotalCredits={setTotalCredits}
            />
          </div>
        </div>
        <div className="ml-4 w-full">
          <div className="flex justify-between w-[640px]">
            <SubjectSelector
              campus={campus}
              semester={semester}
              level={level}
              onValueChange={handleSubjectChange}
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
              <p>Loading...</p>
            ) : (
              subjectData
                .filter((subject) =>
                  subject.sections.some((section) => section.printed === "Y")
                )
                .map((subjectData) => (
                  <ClassRow
                    key={subjectData.courseNumber + subjectData.campusCode}
                    courseFD={subjectData}
                    offeringUnitCode={subjectData.offeringUnitCode}
                    subject={subjectData.subject}
                    courseNumber={subjectData.courseNumber}
                    expandedTitle={subjectData.expandedTitle}
                    title={subjectData.title}
                    credits={subjectData.credits}
                    sections={subjectData.sections}
                    openSections={subjectData.sections.filter(
                      (section) => section.printed === "Y" && section.openStatus === true
                    ).length}
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
