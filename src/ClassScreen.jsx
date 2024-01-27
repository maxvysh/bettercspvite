import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";
import SelectedCourses from "./components/SelectedCourses";

const ClassScreen = () => {
  return (
    <div>
      <Header />
      <body className="p-3">
        <div className="w-96">
          <ScreenSelector />
          <SelectedCourses />
        </div>
      </body>
    </div>
  );
};

export default ClassScreen;
