import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import SelectedCourses from "./components/SelectedCourses";
import SubjectSelector from "./components/SubjectSelector";

const ClassScreen = () => {
  return (
    <div>
      <Header />
      <body className="p-3 flex">
        <div className="w-96">
          <ScreenSelector />
          <SelectedCourses />
        </div>
        <div>
          <div>
            <SubjectSelector />
          </div>
        </div>
      </body>
    </div>
  );
};

export default ClassScreen;
