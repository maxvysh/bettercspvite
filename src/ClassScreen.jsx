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
import { useState } from "react";
import "./css/ClassScreen.css";
import ClassRow from "./components/ClassRow";

const ClassScreen = () => {
  const location = useLocation();
  const { campus, semester } = location.state;
  const [level, setLevel] = useState("U");
  const [subject, setSubject] = useState(null);

  const handleLevelSelectorChange = (value) => {
    setLevel(value);
  };

  const handleSubjectChange = (newValue) => {
    console.log(newValue);
    setSubject(newValue);
  };

  return (
    <div>
      <Header />
      <div className="p-3 flex">
        <div className="w-96">
          <ScreenSelector />
          <SelectedCourses />
        </div>
        <div>
          <div className="flex justify-between w-[640px] ml-2">
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
          <ClassRow
            campus={campus}
            semester={semester}
            level={level}
            subject={subject}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassScreen;
