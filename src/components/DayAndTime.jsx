import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import rightarrow from "@/assets/arrow-right.svg";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

const setValue = (value) => {
  return dayjs(value).format("LT");
};

const DayAndTime = ({
  addTimeButtonPressed,
  setAddTimeButtonPressed,
  selectedFromTime,
  setSelectedFromTime,
  selectedToTime,
  setSelectedToTime,
  isValidTimeRange,
  handleAddTimeFilter,
  timeFilters,
}) => {
  const fromValueSetter = (newValue) => {
    setSelectedFromTime(setValue(newValue));
  };

  const toValueSetter = (newValue) => {
    setSelectedToTime(setValue(newValue));
  };

  return (
    <div>
      <div className="flex justify-between px-3">
        <p>Day and Time</p>
      </div>
      <Card>
        {!addTimeButtonPressed ? (
          <div className="flex flex-col gap-1">
            {timeFilters.map((timeFilter, index) => (
              <div key={index} className="flex justify-between">
                <p>{timeFilter.from}</p>
                <p>{timeFilter.to}</p>
              </div>
            ))}
            <Button
              className="m-1.5 h-fit"
              onClick={() => setAddTimeButtonPressed(true)}
            >
              Add Time Filter
            </Button>
          </div>
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
                  onChange={(value) => fromValueSetter(value)}
                />
              </LocalizationProvider>
              <img src={rightarrow} alt="rightarrow" />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Select Time"
                  onChange={(value) => toValueSetter(value)}
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
                <Button
                  className="h-fit w-20"
                  onClick={() => handleAddTimeFilter()}
                >
                  Add
                </Button>
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
