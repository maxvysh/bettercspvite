import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import rightarrow from "@/assets/arrow-right.svg";

const DayAndTime = ({
  addTimeButtonPressed,
  setAddTimeButtonPressed,
  selectedFromTime,
  setSelectedFromTime,
  selectedToTime,
  setSelectedToTime,
  isValidTimeRange,
  setIsValidTimeRange,
}) => {
  return (
    <div>
      <div className="flex justify-between px-3">
        <p>Day and Time</p>
      </div>
      <Card>
        {!addTimeButtonPressed ? (
          <Button
            className="m-1.5 h-fit"
            onClick={() => setAddTimeButtonPressed(true)}
          >
            Add Time Filter
          </Button>
        ) : (
          <div className="m-1.5 flex flex-col gap-1">
            <div className="flex justify-between mb-1 mx-1">
              <p>From</p>
              <p>To</p>
            </div>
            <div className="flex">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Select Time"
                  value={selectedFromTime}
                  onChange={(newValue) => setSelectedFromTime(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <img src={rightarrow} alt="rightarrow" />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Select Time"
                  value={selectedToTime}
                  onChange={(newValue) => setSelectedToTime(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="flex justify-between">
              <Button
                className="h-fit w-20"
                onClick={() => setAddTimeButtonPressed(false)}
              >
                Cancel
              </Button>
              {!(selectedFromTime && selectedToTime) ? (
                <Button className="h-fit w-20" disabled>
                  Add
                </Button>
              ) : isValidTimeRange ? (
                <Button className="h-fit w-20">Add</Button>
              ) : (
                <Button className="h-fit w-44 bg-[red]" disabled>
                  Not a valid time range
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DayAndTime;
