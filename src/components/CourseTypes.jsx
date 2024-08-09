import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const CourseTypes = ({
  traditionalType,
  setTraditionalType,
  hybridType,
  setHybridType,
  onlineType,
  setOnlineType,
}) => {
  return (
    <div>
      <div className="flex justify-between px-3">
        <p>Course Types</p>
      </div>
      <Card className="flex gap-8 p-1">
        <div className="flex items-center gap-1 ml-1">
          <Checkbox
            checked={traditionalType}
            onCheckedChange={setTraditionalType}
          />
          <p>Traditional</p>
        </div>
        <div className="flex items-center gap-1">
          <Checkbox checked={hybridType} onCheckedChange={setHybridType} />
          <p>Hybrid</p>
        </div>
        <div className="flex items-center gap-1">
          <Checkbox checked={onlineType} onCheckedChange={setOnlineType} />
          <p>Online</p>
        </div>
      </Card>
    </div>
  );
};

export default CourseTypes;
