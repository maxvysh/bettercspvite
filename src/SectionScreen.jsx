import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import SelectedCourses from "./components/SelectedCourses";

const SectionScreen = () => {
  return (
    <div>
      <div className="min-w-[1570px]">
        <Header />
      </div>
      <div className="p-3 flex">
        <div className="w-[330px] min-w-[330px]">
          <ScreenSelector />
          <div className="mt-4">
            {/* <SelectedCourses
            //   selectedCourses={selectedCourses}
            //   setSelectedCourses={setSelectedCourses}
            //   totalCredits={totalCredits}
            //   setTotalCredits={setTotalCredits}
            //   buttonDisabler={buttonDisabler}
            //   setButtonDisabler={setButtonDisabler}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionScreen;
