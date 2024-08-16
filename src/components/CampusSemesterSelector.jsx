import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  //   CardHeader,
  //   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import AppContext from "../AppContext";

const CampusSemesterSelector = () => {
  const navigate = useNavigate();

  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const {
    campus,
    setCampus,
    semester,
    setSemester,
    setSelectedCourses,
    setTotalCredits,
  } = useContext(AppContext);

  const handleCampusChange = (value) => {
    setSelectedCampus(value);
  };

  const handleSemesterChange = (value) => {
    setSelectedSemester(value);
  };

  useEffect(() => {
    if (selectedCampus && selectedSemester) {
      setIsButtonDisabled(false);
    }
  }, [selectedCampus, selectedSemester]);

  const handleButtonClick = () => {
    if (!isButtonDisabled) {
      const oldData = fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/campussemester`
      );
      if (oldData.semester !== semester || oldData.campus !== campus) {
        setSelectedCourses([]);
        setTotalCredits(0);
      }
      // Navigate to /classes
      // Save the campus and semester to mongoDB
      fetch(`${import.meta.env.VITE_BACKEND_URL}/user/campussemester`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campus, semester }),
      });
      setCampus(campus);
      setSemester(semester);
      navigate("/classes");
    } else {
      // Prompt that options are required
      alert("Please select campus and semester options.");
    }
  };

  return (
    <div>
      <Card className="p-6 flex items-center justify-center flex-col gap-4">
        <CardContent className="p-0 flex flex-col gap-2">
          <Select required onValueChange={handleCampusChange}>
            <SelectTrigger className="w-80">
              <SelectValue placeholder="Select your campus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NB">New Brunswick</SelectItem>
              <SelectItem value="NK">Newark</SelectItem>
              <SelectItem value="CM">Camden</SelectItem>
            </SelectContent>
          </Select>
          <Select required onValueChange={handleSemesterChange}>
            <SelectTrigger className="w-80">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="92024">Fall</SelectItem>
              <SelectItem value="72024">Summer</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className="p-0 m-0">
          <Button
            className={`w-80 mx-auto block px-4 py-2 rounded-md ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#090e1b]"
            }`}
            // disabled={isButtonDisabled}
            onClick={handleButtonClick}
          >
            Start Planning!
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CampusSemesterSelector;
