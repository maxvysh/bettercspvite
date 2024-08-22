// /* eslint-disable react/prop-types */
// import { ChevronDown } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import xCircle from "../assets/x-circle-black.svg";
// import SVG from "react-inlinesvg";
// import DropdownSection from "./DropdownSection";
// import { use } from "passport";
// import { useContext } from "react";
// import AppContext from "../AppContext";

// const ClassRow = ({
//   offeringUnitCode,
//   subject,
//   courseNumber,
//   expandedTitle,
//   title,
//   credits,
//   sections,
//   openSections,
//   totalSections,
//   preReqNotes,
//   selectedCourses,
//   setSelectedCourses,
//   totalCredits,
//   setTotalCredits,
// }) => {
//   const [useTitle, setUseTitle] = useState("");
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const { campus, semester, level, selectedCourses, setSelectedCourses } =
//     useContext(AppContext);
//   const [subjectData, setSubjectData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const sanitizedPreReqNotes = preReqNotes
//     ? preReqNotes.replace(/<\/?em>/g, "")
//     : "None listed!";

//   // useEffect(() => {
//   //   selectedCourses.forEach((course) => {
//   //     // Find the full data for each course by fetching the offeringUnitCode
//   //     fetch(
//   //       `${import.meta.env.BACKEND_URL}/courses?subject=${
//   //         course.subject
//   //       }&semester=${semester}&campus=${campus}&level=${level}`
//   //     )
//   //       .then((response) => response.text())
//   //       .then((data) => {
//   //         setSubjectData(JSON.parse(data));
//   //       })
//   //       .catch((error) => console.error("Error:", error));
//   //   });
//   //   console.log(subjectData);
//   // }, [selectedCourses]);

//   // const handleSectionDropdown = () => {
//   //   setIsDropdownVisible(!isDropdownVisible);
//   // };

//   useEffect(() => {
//     if (expandedTitle && expandedTitle.trim() !== "") {
//       setUseTitle(expandedTitle);
//     } else {
//       setUseTitle(title);
//     }
//   }, [expandedTitle, title]);

//   // useEffect(() => {
//   //   if (
//   //     selectedCourses.some(
//   //       (course) =>
//   //         course.offeringUnitCode === offeringUnitCode &&
//   //         course.subject === subject &&
//   //         course.courseNumber === courseNumber
//   //     )
//   //   ) {
//   //     setButtonHover(true);
//   //   }
//   //   else {
//   //     setButtonHover(false);
//   //   }
//   // }, [selectedCourses]);

//   // useEffect(() => {
//   //   if (
//   //     selectedCourses.some(
//   //       (course) =>
//   //         course.offeringUnitCode === offeringUnitCode &&
//   //         course.subject === subject &&
//   //         course.courseNumber === courseNumber
//   //     )
//   //   ) {
//   //     setButtonHover(true);
//   //   }
//   // }, []);

//   return (
//     <div>
//       <Card className="border-2 mt-1 min-w-[1200px] w-full">
//         <div className="flex text-nowrap justify-between w-full p-1">
//           <div className="flex items-center w-full">
//             <button onClick={handleSectionDropdown}>
//               <ChevronDown className="ml-2 -mr-1" />
//             </button>
//             <p className="mx-1 w-24 text-center">
//               {offeringUnitCode}:{subject}:{courseNumber}
//             </p>
//             <div className="flex-grow w-[200px]">
//               <p className="font-semibold truncate text-[18px]">{useTitle}</p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <div className="ml-8 w-24 flex justify-center">
//               {credits ? (
//                 <p>{credits} credits</p>
//               ) : (
//                 <HoverCard>
//                   <HoverCardTrigger className="underline">
//                     Credits by...
//                   </HoverCardTrigger>
//                   <HoverCardContent className="w-full">
//                     Credits by arrangement
//                   </HoverCardContent>
//                 </HoverCard>
//               )}
//             </div>
//             <div className="flex items-center ml-8">
//               <p>Sections:</p>
//               <div className="flex -mt-[1px]">
//                 <p className="text-[20px] w-[25px] flex justify-end text-green-500">
//                   {openSections}
//                 </p>
//                 <p className="text-[20px] w-[10px] flex justify-center">|</p>
//                 <p className="text-[20px] w-[25px] flex justify-start text-red-500">
//                   {totalSections - openSections}
//                 </p>
//               </div>
//             </div>
//             <HoverCard>
//               <HoverCardTrigger className="underline ml-3.5">
//                 Prerequisites
//               </HoverCardTrigger>
//               <HoverCardContent className="text-wrap text-center w-full max-w-[300px]">
//                 {sanitizedPreReqNotes}
//               </HoverCardContent>
//             </HoverCard>
//           </div>
//         </div>
//         {isDropdownVisible ? (
//           <div>
//             <div className="border-t-2">
//               <div className="grid grid-cols-7 mx-2">
//                 <p className="col-span-1 text-center">section</p>
//                 <p className="col-span-1 text-center">status</p>
//                 <p className="col-span-1 text-center">index</p>
//                 <p className="col-span-2 text-center">
//                   meeting times/locations
//                 </p>
//                 <p className="col-span-1 text-center">exam code</p>
//                 <p className="col-span-1 text-center">instructors</p>
//               </div>
//             </div>
//             {sections
//               .filter((section) => section.printed === "Y")
//               .map((section, index) => (
//                 <DropdownSection
//                   key={index}
//                   section={section.number}
//                   openStatus={section.openStatus}
//                   index={section.index}
//                   meetingTimes={section.meetingTimes}
//                   examCode={section.examCode}
//                   instructors={section.instructors}
//                 />
//               ))}
//           </div>
//         ) : null}
//       </Card>
//     </div>
//   );
// };

// export default ClassRow;
