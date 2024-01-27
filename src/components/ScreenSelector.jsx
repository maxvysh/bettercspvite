import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ScreenSelector = () => {
  return (
    <Card className="flex flex-col justify-evenly h-52 p-2 border-2">
      <Button className="text-base">Select Schedule</Button>
      <Button variant="outline" className="border-2 text-base text-gray-500">Select Sections</Button>
      <Button variant="outline" className="border-2 text-base text-gray-500">Build Schedule</Button>
      <Button variant="outline" className="border-2 text-base text-gray-500">Saved Schedule</Button>
    </Card>
  );
};

export default ScreenSelector;
