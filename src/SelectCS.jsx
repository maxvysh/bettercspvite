import CampusSemesterSelector from "./components/CampusSemesterSelector"

const SelectCS = () => {
  return (
    <div className="h-screen bg-custom-blue">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-8xl text-white">
          A better course schedule planner for Rutgers
        </h1>
        <CampusSemesterSelector />
      </div>
    </div>
  )
}

export default SelectCS