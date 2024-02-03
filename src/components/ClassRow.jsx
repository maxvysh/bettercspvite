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
}) => {
  return (
    <div>
      <Card className="border-2 mt-1">
        <div className="flex justify-between p-2 items-center text-center">
          <div className="flex justify-start gap-6">
            <div className="flex items-center">
              <ChevronDown className="h-7 w-7 shrink-0 transition-transform duration-200" />
            </div>
            <p className="flex items-center">
              {offeringUnitCode}:{subject}:{courseNumber}
            </p>
            {expandedTitle && expandedTitle.trim() !== "" ? (
              <p className="font-semibold text-[20px]">{expandedTitle}</p>
            ) : (
              <p className="font-semibold text-[20px]">{title}</p>
            )}
            <p className="flex items-center">
              {credits ? (
                <p>{credits} credits</p>
              ) : (
                <p>Credits by arrangment</p>
              )}
            </p>
            <p className="flex items-center">
              Sections: {openSections} | {totalSections - openSections}
            </p>
            <div className="flex items-center">
              <HoverCard>
                <HoverCardTrigger>Prerequisites</HoverCardTrigger>
                <HoverCardContent>
                  The React Framework – created and maintained by @vercel.
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          <Button className="ml-5">Add Class</Button>
        </div>
      </Card>
    </div>
  );
};

export default ClassRow;
