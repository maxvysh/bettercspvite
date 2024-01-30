import { Card } from "@/components/ui/card";
import SelectedCoursesRow from "./SelectedCoursesRow";

const SelectedCourses = () => {
  return (
    <div>
        <div className="flex justify-between px-3">
            <p>Selected Courses</p>
            <p>Credits: 16</p>
        </div>
        <Card className="p-2 border-2">
            <SelectedCoursesRow />
        </Card>
    </div>
  )
}

export default SelectedCourses