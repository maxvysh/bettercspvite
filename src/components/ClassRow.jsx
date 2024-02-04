import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

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
  const sanitizedPreReqNotes = preReqNotes
    ? preReqNotes.replace(/<\/?em>/g, "")
    : "None listed!";

  return (
    <div>
      <Card className="border-2 mt-1 p-1 min-w-[1000px] w-full">
        <div className="flex text-nowrap justify-between w-full">
          <div className="flex items-center w-full">
            <ChevronDown className="mx-1" />
            <p className="mx-1 w-24 text-center">
              {offeringUnitCode}:{subject}:{courseNumber}
            </p>
            <div className="flex-grow w-[200px] border-2 border-red-500">
              {expandedTitle && expandedTitle.trim() !== "" ? (
                <p className="font-semibold truncate text-[18px]">{expandedTitle}</p>
              ) : (
                <p className="font-semibold truncate text-[18px]">{title}</p>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <p>
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
            </p>
            <div className="flex items-center">
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
              <HoverCardTrigger className="underline">
                Prerequisites
              </HoverCardTrigger>
              <HoverCardContent className="text-wrap text-center w-full max-w-[300px]">
                {sanitizedPreReqNotes}
              </HoverCardContent>
            </HoverCard>
            <Button>Add Class</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClassRow;
