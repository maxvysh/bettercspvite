import { Card } from "@/components/ui/card";
import SelectedCoursesRow from "./SelectedCoursesRow";

const SelectedCourses = ({
  selectedCourses,
  setSelectedCourses,
  totalCredits,
  setTotalCredits,
}) => {
  return (
    <div>
      <div className="flex justify-between px-3">
        <p>Selected Courses</p>
        <p>Credits: {totalCredits}</p>
      </div>
      <Card className="p-2 border-2 flex flex-col gap-1">
        {/* <SelectedCoursesRow /> */}
        {selectedCourses.length === 0 ? (
          <p>Select some courses for them to display here</p>
        ) : (
          selectedCourses.map((course, index) => (
            <SelectedCoursesRow
              key={index}
              offeringUnitCode={course.offeringUnitCode}
              subject={course.subject}
              courseNumber={course.courseNumber}
              useTitle={course.useTitle}
              credits={course.credits}
              selectedCourses={selectedCourses}
              setSelectedCourses={setSelectedCourses}
              totalCredits={totalCredits}
              setTotalCredits={setTotalCredits}
            />
          ))
        )}
      </Card>
    </div>
  );
};

export default SelectedCourses;
