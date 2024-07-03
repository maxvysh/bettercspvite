/* eslint-disable react/prop-types */
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import xCircle from "../assets/x-circle-black.svg";
import SVG from "react-inlinesvg";
import DropdownSectionSec from "./DropdownSectionSec";
import { useContext } from "react";
import AppContext from "../AppContext";

const ClassRowSec = ({
  offeringUnitCode,
  subject,
  courseNumber,
  expandedTitle,
  title,
  credits,
  sections,
  openSections,
  totalSections,
  preReqNotes,
  selectedCourses,
  setSelectedCourses,
  totalCredits,
  setTotalCredits,
  selectedIndexes,
  setSelectedIndexes,
}) => {
  const [useTitle, setUseTitle] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    // If the checkbox is unchecked, remove the index from the selectedIndexes array
    // Otherwise add it
  };

  const sanitizedPreReqNotes = preReqNotes
    ? preReqNotes.replace(/<\/?em>/g, "")
    : "None listed!";

  const handleSectionDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    if (expandedTitle && expandedTitle.trim() !== "") {
      setUseTitle(expandedTitle);
    } else {
      setUseTitle(title);
    }
  }, [expandedTitle, title]);

  return (
    <div>
      <Card className="border-2 mt-1 min-w-[1200px] w-full">
        <div className="flex text-nowrap justify-between w-full p-1 h-12">
          <div className="flex items-center w-full">
            <button onClick={handleSectionDropdown}>
              <ChevronDown className="ml-2 -mr-1" />
            </button>
            <p className="mx-1 w-24 text-center">
              {offeringUnitCode}:{subject}:{courseNumber}
            </p>
            <div className="flex-grow w-[200px]">
              <p className="font-semibold truncate text-[18px]">{useTitle}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-8 w-24 flex justify-center">
              {credits ? (
                <p>{credits} credits</p>
              ) : (
                <HoverCard>
                  <HoverCardTrigger className="underline">
                    Credits by...
                  </HoverCardTrigger>
                  <HoverCardContent className="w-full">
                    Credits by arrangement
                  </HoverCardContent>
                </HoverCard>
              )}
            </div>
            <div className="flex items-center ml-8">
              <p>Sections:</p>
              <div className="flex -mt-[1px]">
                <p className="text-[20px] w-[25px] flex justify-end text-green-500">
                  {openSections}
                </p>
                <p className="text-[20px] w-[10px] flex justify-center">|</p>
                <p className="text-[20px] w-[25px] flex justify-start text-red-500">
                  {totalSections - openSections}
                </p>
              </div>
            </div>
            <div className="mr-2">
              <HoverCard>
                <HoverCardTrigger className="underline ml-3.5">
                  Prerequisites
                </HoverCardTrigger>
                <HoverCardContent className="text-wrap text-center w-full max-w-[300px]">
                  {sanitizedPreReqNotes}
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
        {isDropdownVisible ? (
          <div>
            <div className="border-t-2">
              <div className="flex relative">
                <div className="absolute left-8 top-1 flex items-center justify-center">
                  <Checkbox onCheckedChange={handleCheckboxChange} defaultChecked />
                </div>
                <div className="grid grid-cols-7 mx-2 w-full">
                  <p className="col-span-1 text-center">section</p>
                  <p className="col-span-1 text-center">status</p>
                  <p className="col-span-1 text-center">index</p>
                  <p className="col-span-2 text-center">
                    meeting times/locations
                  </p>
                  <p className="col-span-1 text-center">exam code</p>
                  <p className="col-span-1 text-center">instructors</p>
                </div>
              </div>
            </div>
            {sections
              .filter((section) => section.printed === "Y")
              .map((section, index) => (
                <DropdownSectionSec
                  key={index}
                  section={section.number}
                  openStatus={section.openStatus}
                  index={section.index}
                  meetingTimes={section.meetingTimes}
                  examCode={section.examCode}
                  instructors={section.instructors}
                  check={isChecked}
                />
              ))}
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default ClassRowSec;
