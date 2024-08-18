import CampusSemesterSelector from "./components/CampusSemesterSelector";

const SelectCS = () => {
  return (
    <div
      className="h-screen min-w-[340px] fixed inset-0 flex items-center justify-center"
      style={{
        backgroundImage: `url(/cloud_frame.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col gap-4 items-center justify-center pb-36">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-center text-white p-4">
          A better course schedule planner for Rutgers
        </h1>
        <CampusSemesterSelector />
      </div>
    </div>
  );
};

export default SelectCS;
