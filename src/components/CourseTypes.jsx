import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const CourseTypes = () => {
  return (
    <div>
      <div className="flex justify-between px-3">
        <p>Course Types</p>
      </div>
      <Card className="flex gap-8 p-1">
        <div className="flex items-center gap-1 ml-1">
          <Checkbox />
          <p>Traditional</p>
        </div>
        <div className="flex items-center gap-1">
          <Checkbox />
          <p>Hybrid</p>
        </div>
        <div className="flex items-center gap-1">
          <Checkbox />
          <p>Online</p>
        </div>
      </Card>
    </div>
  );
};

export default CourseTypes;
