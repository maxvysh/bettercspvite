import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import SelectedCourses from "./components/SelectedCourses";
import { useContext, useState } from "react";
import AppContext from "./AppContext";
import ClassRow from "./components/ClassRow";

const SectionScreen = () => {
  const { selectedCourses, setSelectedCourses, totalCredits, setTotalCredits } =
    useContext(AppContext);

  const [subjectData, setSubjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      <div className="min-w-[1570px]">
        <Header />
      </div>
      <div className="p-3 flex">
        <div className="w-[330px] min-w-[330px]">
          <ScreenSelector />
          <div className="mt-4">
            <SelectedCourses
              selectedCourses={selectedCourses}
              setSelectedCourses={setSelectedCourses}
              totalCredits={totalCredits}
              setTotalCredits={setTotalCredits}
            />
          </div>
        </div>
        <div className="ml-4 w-full">
          {/* <div>
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
                    sections={subjectData.sections}
                    openSections={subjectData.openSections}
                    totalSections={
                      subjectData.sections.filter(
                        (section) => section.printed === "Y"
                      ).length
                    }
                    preReqNotes={subjectData.preReqNotes}
                    selectedCourses={selectedCourses}
                    setSelectedCourses={setSelectedCourses}
                    totalCredits={totalCredits}
                    setTotalCredits={setTotalCredits}
                  />
                ))
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SectionScreen;
