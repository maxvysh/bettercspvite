import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import SelectedCourses from "./components/SelectedCourses";
import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import ClassRowSec from "./components/ClassRowSec";

const SectionScreen = () => {
  const {
    selectedCourses,
    setSelectedCourses,
    totalCredits,
    setTotalCredits,
    semester,
    campus,
    level,
    fetchCampusSemester,
  } = useContext(AppContext);

  const [subjectData, setSubjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Check for null campus, semester, and level
  //   if (!campus || !semester) {
  //     fetchCampusSemester();
  //   } else {
  //     selectedCourses.forEach((course) => {
  //       fetch(
  //         `${import.meta.env.VITE_BACKEND_URL}/courses?subject=${
  //           course.subject
  //         }&semester=${semester}&campus=${campus}&level=${level}`
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           // Assuming data is an array of courses
  //           const foundCourse = data.find(
  //             (c) => c.courseNumber === course.courseNumber
  //           );
  //           if (foundCourse) {
  //             setSubjectData((prevData) => [...prevData, foundCourse]);
  //             console.log("Course found:", foundCourse);
  //           } else {
  //             console.log("Course not found:", course);
  //           }
  //         })
  //         .catch((error) =>
  //           console.error("Error fetching course data:", error)
  //         );
  //     });
  //     setIsLoading(false);
  //   }
  // }, [selectedCourses, semester, campus, level]); // Add dependencies as needed

  useEffect(() => {
    // Check for null campus, semester, and level
    if (!campus || !semester) {
      fetchCampusSemester();
    } else {
      setIsLoading(true); // Start loading before fetching data

      const fetchPromises = selectedCourses.map((course) =>
        fetch(
          `${import.meta.env.VITE_BACKEND_URL}/courses?subject=${
            course.subject
          }&semester=${semester}&campus=${campus}&level=${level}`
        )
          .then((response) => response.json())
          .then((data) => {
            // Assuming data is an array of courses
            const foundCourse = data.find(
              (c) => c.courseNumber === course.courseNumber
            );
            if (foundCourse) {
              return foundCourse; // Return found course for further processing
            } else {
              return null; // Return null if no course found
            }
          })
          .catch((error) => {
            console.error("Error fetching course data:", error);
            return null; // Return null in case of error
          })
      );

      Promise.all(fetchPromises).then((courses) => {
        // Filter out null values (not found or error cases)
        const validCourses = courses.filter((course) => course !== null);
        setSubjectData(validCourses); // Update state with all found courses
        setIsLoading(false); // Stop loading after all fetches are complete
      });
    }
  }, [selectedCourses, semester, campus, level]); // Add dependencies as needed

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
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              subjectData
                .filter((subject) =>
                  subject.sections.some((section) => section.printed === "Y")
                )
                .map((subjectData) => (
                  <ClassRowSec
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionScreen;
