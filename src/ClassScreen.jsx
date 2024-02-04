import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import SelectedCourses from "./components/SelectedCourses";
import SubjectSelector from "./components/SubjectSelector";
import { useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import ClassRow from "./components/ClassRow";

const ClassScreen = () => {
  const location = useLocation();
  const { campus, semester } = location.state;
  const [level, setLevel] = useState("U");
  const [subject, setSubject] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subjectName, setSubjectName] = useState("");

  const handleLevelSelectorChange = (value) => {
    setLevel(value);
  };

  const handleSubjectChange = (newValue) => {
    console.log(newValue);
    setSubject(newValue);
  };

  useEffect(() => {
    console.log("fetching subject data");
    console.log(campus, semester, level, subject);
    setIsLoading(true);
    fetch(
      `/oldsoc/courses.json?subject=${subject}&semester=${semester}&campus=${campus}&level=${level}`
    )
      .then((response) => response.text())
      .then((data) => {
        setSubjectData(JSON.parse(data));
      })
      .then(() => setIsLoading(false))
      .catch((error) => console.error("Error:", error));
  }, [campus, semester, level, subject]);

  return (
    <div>
      <Header />
      <div className="p-3 flex">
        <div className="w-[330px] min-w-[330px]">
          <ScreenSelector />
          <SelectedCourses />
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
                  offeringUnitCode={subjectData.offeringUnitCode}
                  subject={subjectData.subject}
                  courseNumber={subjectData.courseNumber}
                  expandedTitle={subjectData.expandedTitle}
                  title={subjectData.title}
                  credits={subjectData.credits}
                  openSections={subjectData.openSections}
                  totalSections={subjectData.sections.length}
                  preReqNotes={subjectData.preReqNotes}
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
