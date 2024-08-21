function buildSchedules(selectedIndexes, indexTimes, generatedSchedulesSet) {
  let courseIndexes = splitByCourse(selectedIndexes, indexTimes);
  let validSchedules = generateValidSchedules(courseIndexes, indexTimes, generatedSchedulesSet);

  return validSchedules;
}

function generateValidSchedules(courseIndexes, indexTimes, generatedSchedulesSet) {
  let validSchedules = [];
  let courses = Object.keys(courseIndexes);
  let numClasses = courses.length;

  function backtrack(currentCombination, currentIndex) {
    if (currentIndex === numClasses) {
      if (isWorkingSchedule(currentCombination, indexTimes)) {
        const scheduleStr = JSON.stringify(currentCombination.slice());
        if (!generatedSchedulesSet.has(scheduleStr)) {
          generatedSchedulesSet.add(scheduleStr);
          validSchedules.push(currentCombination.slice());
        }
      }
      return;
    }
    let course = courses[currentIndex];
    let indexes = courseIndexes[course];
    for (let index of indexes) {
      currentCombination.push(index);
      backtrack(currentCombination, currentIndex + 1);
      currentCombination.pop();
      if (validSchedules.length >= 10) {
        return;
      }
    }
  }

  backtrack([], 0);
  return validSchedules;
}

function splitByCourse(selectedIndexes, indexTimes) {
  let courseIndexes = {};
  for (let index of selectedIndexes) {
    let course = indexTimes[index].courseCode;
    if (!courseIndexes[course]) {
      courseIndexes[course] = [];
    }
    courseIndexes[course].push(index);
  }
  return courseIndexes;
}

function isWorkingSchedule(combination, indexTimes) {
  let intervals = [];

  const convertToMinutes = (time) => {
    if (!time) {
      return;
    }
    let hours = parseInt(time.substring(0, 2), 10);
    let minutes = parseInt(time.substring(2), 10);
    return hours * 60 + minutes;
  };

  for (let index of combination) {
    let indexTime = indexTimes[index];
    const dayToNumber = {
      M: 0,
      T: 1,
      W: 2,
      TH: 3,
      F: 4,
      S: 5,
      SU: 6,
    };

    for (let meeting of indexTime.meetingTimes) {
      let day = meeting.meetingDay;
      let pmCode = meeting.pmCode;
      let start = meeting.startTime;
      let end = meeting.endTime;
      let campus = meeting.campusName;
      if (pmCode === "P") {
        if (start.substring(0, 2) !== "12") {
          let hours = parseInt(start.substring(0, 2), 10);
          hours += 12;
          start = hours + start.substring(2);
        }
        if (end.substring(0, 2) !== "12") {
          let hours = parseInt(end.substring(0, 2), 10);
          hours += 12;
          end = hours + end.substring(2);
        }
      }
      let interval = {
        day: dayToNumber[day],
        start: convertToMinutes(start),
        end: convertToMinutes(end),
        campus: campus,
      };
      intervals.push(interval);
    }
  }

  intervals.sort((a, b) => {
    if (a.day !== b.day) {
      return a.day - b.day;
    }
    return a.start - b.start;
  });

  for (let i = 1; i < intervals.length; i++) {
    let previous = intervals[i - 1];
    let current = intervals[i];
    if (previous.day !== current.day) {
      continue;
    }
    if (previous.end > current.start) {
      if (previous.campus === "BUSCH" && current.campus === "LIVINGSTON" || previous.campus === "LIVINGSTON" && current.campus === "BUSCH") {
        if (current.start - previous.end < 30) {
          return false;
        }
      } else {
        if (current.start - previous.end < 40) {
          return false;
        }
      }
    }
  }
  return true;
}

export {
  buildSchedules,
  splitByCourse,
  generateValidSchedules,
  isWorkingSchedule,
};