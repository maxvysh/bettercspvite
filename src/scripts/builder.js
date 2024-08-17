function buildSchedules(selectedIndexes, indexTimes) {
  // Shuffle the selectedIndexes
  selectedIndexes = selectedIndexes.sort(() => Math.random() - 0.5);

  let courseIndexes = splitByCourse(selectedIndexes, indexTimes);
  let validSchedules = [];
  let combinationGenerator = generateCombinations(courseIndexes);

  for (let combination of combinationGenerator) {
    if (isWorkingSchedule(combination, indexTimes)) {
      validSchedules.push(combination);
      if (validSchedules.length === 10) {
        break;
      }
    }
  }

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

function* generateCombinations(courseIndexes) {
  let courses = Object.keys(courseIndexes);
  let numClasses = courses.length;
  let currentCombination = [];
  let currentIndex = 0;
  yield* generateCombinationsHelper(
    courseIndexes,
    currentCombination,
    currentIndex,
    numClasses
  );
}

function* generateCombinationsHelper(
  courseIndexes,
  currentCombination,
  currentIndex,
  numClasses
) {
  if (currentIndex === numClasses) {
    yield currentCombination.slice();
    return;
  }
  let course = Object.keys(courseIndexes)[currentIndex];
  let indexes = courseIndexes[course];
  for (let index of indexes) {
    currentCombination.push(index);
    yield* generateCombinationsHelper(
      courseIndexes,
      currentCombination,
      currentIndex + 1,
      numClasses
    );
    currentCombination.pop();
  }
}

function isWorkingSchedule(combination, indexTimes) {
  let intervals = [];

  const convertToMinutes = (day, time) => {
    if (!time) {
      return;
    }
    let hours = parseInt(time.substring(0, 2), 10);
    let minutes = parseInt(time.substring(2), 10);
    return day * 24 * 60 + hours * 60 + minutes;
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
        start: convertToMinutes(dayToNumber[day], start),
        end: convertToMinutes(dayToNumber[day], end),
        campus: campus,
      };

      // Check if the end is smaller than the start, if so add 12 hours to the end
      if (interval.end < interval.start) {
        interval.end += 12 * 60;
      }

      intervals.push(interval);
    }
  }

  intervals.sort((a, b) => a.start - b.start);

  for (let i = 1; i < intervals.length; i++) {
    let previous = intervals[i - 1];
    let current = intervals[i];
    if (previous.end > current.start) {
      if (previous.campus === "BUSCH" && current.campus === "LIVINGSTON") {
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

export { buildSchedules };
