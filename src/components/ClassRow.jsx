import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import xCircle from "../assets/x-circle-black.svg";
import SVG from "react-inlinesvg";

const ClassRow = ({
  offeringUnitCode,
  subject,
  courseNumber,
  expandedTitle,
  title,
  credits,
  openSections,
  totalSections,
  preReqNotes,
}) => {
  const [buttonContent, setButtonContent] = useState("Added!");
  const [buttonHover, setButtonHover] = useState(false);
  const [color, setColor] = useState("rgb(34 197 94)");

  const sanitizedPreReqNotes = preReqNotes
    ? preReqNotes.replace(/<\/?em>/g, "")
    : "None listed!";

  const handleAddClass = () => {
    setButtonHover(true);
  };

  const handleRemoveClass = () => {
    setButtonHover(false);
  };

  return (
    <div>
      <Card className="border-2 mt-1 p-1 min-w-[1200px] w-full">
        <div className="flex text-nowrap justify-between w-full">
          <div className="flex items-center w-full">
            <ChevronDown className="ml-2 -mr-1" />
            <p className="mx-1 w-24 text-center">
              {offeringUnitCode}:{subject}:{courseNumber}
            </p>
            <div className="flex-grow w-[200px]">
              {expandedTitle && expandedTitle.trim() !== "" ? (
                <p className="font-semibold truncate text-[18px]">
                  {expandedTitle}
                </p>
              ) : (
                <p className="font-semibold truncate text-[18px]">{title}</p>
              )}
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
            <HoverCard>
              <HoverCardTrigger className="underline ml-3.5">
                Prerequisites
              </HoverCardTrigger>
              <HoverCardContent className="text-wrap text-center w-full max-w-[300px]">
                {sanitizedPreReqNotes}
              </HoverCardContent>
            </HoverCard>
            {buttonHover ? (
              <Button
                id="removeButton"
                className="ml-8 w-[100px]"
                style={{ backgroundColor: color }}
                onClick={handleRemoveClass}
                onMouseEnter={() => {
                  setButtonContent(
                    <SVG src={xCircle} alt="X" />
                  );
                  setColor('rgb(239 68 68)');
                }}
                onMouseLeave={() => {
                  setButtonContent("Added!");
                  setColor('rgb(34 197 94)');
                }}
              >
                {buttonContent}
              </Button>
            ) : (
              <Button
                id="addButton"
                className="ml-8 w-[100px]"
                onClick={handleAddClass}
              >
                Add Class
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClassRow;
