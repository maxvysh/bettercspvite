import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const SectionStatus = () => {
  return (
    <div>
      <div className="flex justify-between px-3">
        <p>Section status</p>
      </div>
      <Card className="flex gap-8 p-1">
        <div className="flex items-center gap-1 ml-1">
          <Checkbox />
          <p>Open</p>
        </div>
        <div className="flex items-center gap-1">
          <Checkbox />
          <p>Closed</p>
        </div>
      </Card>
    </div>
  );
};

export default SectionStatus;
