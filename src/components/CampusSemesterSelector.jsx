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
import { useState } from "react";

const CampusSemesterSelector = () => {
  const navigate = useNavigate();

  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleCampusChange = (value) => {
    setSelectedCampus(value);
    console.log(value);
    checkButtonDisabled(value, selectedSemester);
  };

  const handleSemesterChange = (value) => {
    setSelectedSemester(value);
    console.log(value);
    checkButtonDisabled(selectedCampus, value);
  };

  const checkButtonDisabled = (campus, semester) => {
    setIsButtonDisabled(!campus || !semester);
  };

  const handleButtonClick = () => {
    if (!isButtonDisabled) {
      // Navigate to /classes
      navigate("/classes", {
        state: { campus: selectedCampus, semester: selectedSemester },
      });
    } else {
      // Prompt that options are required
      alert("Please select campus and semester options.");
    }
  };

  return (
    <div>
      <Card className="p-8 mt-72 flex items-center justify-center flex-col">
        <CardContent className="p-0 pb-6">
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
            <SelectTrigger className="w-80 mt-2">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12024">Spring</SelectItem>
              <SelectItem value="72024">Summer</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter className="p-0">
          <Button
            className={`w-80 my-4 mx-auto block px-4 py-2 rounded ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500"
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
