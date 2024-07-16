import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BuildSelector = ({ displayList, setDisplayList }) => {
  return (
    <Card className="flex flex-col justify-evenly p-2 border-2 gap-1">
      {!displayList ? (
        <Button className="text-base">Calendar View</Button>
      ) : (
        <Button
          variant="outline"
          className="border-2 text-base text-gray-500"
          onClick={() => setDisplayList(false)}
        >
          Calendar View
        </Button>
      )}

      {displayList ? (
        <Button className="text-base">List View</Button>
      ) : (
        <Button
          variant="outline"
          className="border-2 text-base text-gray-500"
          onClick={() => setDisplayList(true)}
        >
          List View
        </Button>
      )}
    </Card>
  );
};

export default BuildSelector;
