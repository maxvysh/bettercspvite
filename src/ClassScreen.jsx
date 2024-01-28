import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import SelectedCourses from "./components/SelectedCourses";
import SubjectSelector from "./components/SubjectSelector";
import { useLocation } from "react-router-dom";

const ClassScreen = () => {
  const location = useLocation();
  const { campus, semester } = location.state;

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
            <SubjectSelector campus={campus} semester={semester} />
          </div>
        </div>
      </body>
    </div>
  );
};

export default ClassScreen;
