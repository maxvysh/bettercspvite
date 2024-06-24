import React from "react";
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

import { useEffect, useState } from "react";

const SubjectSelector = ({ campus, semester, level, onValueChange }) => {
  const [data, setData] = useState(null);
  const [frameworks, setFrameworks] = useState([]);

  useEffect(() => {
    if (!campus || !semester || !level) return;

    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/subjects?semester=${semester}&campus=${campus}&level=${level}`
    )
      .then((response) => response.text())
      .then((data) => {
        setData(JSON.parse(data));
      })
      .catch((error) => console.error("Error:", error));
  }, [campus, semester, level]);

  useEffect(() => {
    if (data) {
      const mappedSubjects = data.map((item) => ({
        value: `${item.description} ${item.code}`
          .toLowerCase()
          .replace(/\s+/g, ""),
        label: `${item.description} ${item.code}`,
        code: item.code,
      }));

      setFrameworks([...mappedSubjects]);
    }
  }, [data]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="border-2">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[450px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select a subject..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[450px] p-0">
        <Command>
          <CommandInput placeholder="Search subject..." />
          <ScrollArea className="h-96">
            <CommandEmpty>No subject found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    onValueChange(framework.code);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
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
  );
};

export default SubjectSelector;
