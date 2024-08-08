import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

const CoreCodeSort = ({ onValueChange, onCheckBoxChange }) => {
  const [data] = useState([
    { value: "CE", name: "Non-Core: Community Engagement" },
    { value: "AHo", name: "Philosophical and Theoretical Issues" },
    { value: "AHp", name: "Arts and Literatures" },
    { value: "AHq", name: "Nature of Languages" },
    { value: "AHr", name: "Critical Creative Expression" },
    { value: "CC", name: "Contemporary Challenges - See CCD and CCO" },
    { value: "CCD", name: "Diversities and Social Inequalities" },
    { value: "CCO", name: "Our Common Future" },
    { value: "ECN", name: "SEBS Only: Economic Analysis" },
    { value: "GVT", name: "SEBS Only: Government/Regulatory Analysis" },
    { value: "HST", name: "Historical Analysis" },
    { value: "ITR", name: "Information Technology and Research" },
    { value: "NS", name: "Natural Sciences" },
    { value: "QQ", name: "Quantitative Information" },
    { value: "QR", name: "Mathematical or Formal Reasoning" },
    { value: "SCL", name: "Social Analysis" },
    { value: "WC", name: "Writing and Communication" },
    { value: "WCd", name: "Writing and Communication in a Discipline" },
    { value: "WCr", name: "Writing and Communication, Revision" },
  ]);
  const [frameworks, setFrameworks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (data) {
      const mappedSubjects = data.map((item) => ({
        value: `${item.value}`,
        label: `${item.value}: ${item.name}`,
      }));

      setFrameworks([...mappedSubjects]);
    }
  }, [data]);

  const handleSelect = (currentValue) => {
    setSelectedValues((prevValues) => {
      if (prevValues.includes(currentValue)) {
        return prevValues.filter((value) => value !== currentValue);
      } else {
        return [...prevValues, currentValue];
      }
    });
  };

  useEffect(() => {
    onValueChange(
      selectedValues.map(
        (value) =>
          frameworks.find((framework) => framework.value === value)?.value
      )
    );
  }, [selectedValues, frameworks]);

  useEffect(() => {
    onCheckBoxChange(checked);
  }, [checked]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="flex justify-between px-3">
          <p>Sort by core codes</p>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="border-2">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              <span className="truncate">
                {selectedValues.length > 0
                  ? selectedValues
                      .map(
                        (value) =>
                          frameworks.find(
                            (framework) => framework.value === value
                          )?.value
                      )
                      .join(", ")
                  : "Select a subject..."}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search subject..." />
              <ScrollArea className="h-96">
                <CommandEmpty>No subject found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={() => handleSelect(framework.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValues.includes(framework.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center gap-1">
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <p>Online</p>
      </div>
    </div>
  );
};

export default CoreCodeSort;
