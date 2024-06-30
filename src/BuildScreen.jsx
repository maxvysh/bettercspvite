import Header from "./components/Header";
import ScreenSelector from "./components/ScreenSelector";

const BuildScreen = () => {
  return (
    <div>
      <div className="min-w-[1570px]">
        <Header />
      </div>
      <div className="p-3">
        <div className="w-[330px] min-w-[330px]">
          <ScreenSelector />
        </div>
      </div>
    </div>
  );
};

export default BuildScreen;
