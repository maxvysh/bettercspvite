function buildSchedules(selectedIndexes, indexTimes) {
  // Shuffle the selectedIndexes and split them by course
  shuffle(selectedIndexes);

  let courseIndexes = splitByCourse(selectedIndexes, indexTimes);
  let allCombinations = generateCombinations(courseIndexes);

  return allCombinations;
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function buildValidSchedules(allCombinations, indexTimes) {
  // Shuffles the allCombinations array and returns the first 10 valid schedules
  allCombinations = shuffle(allCombinations);
  return workingSchedules(allCombinations, indexTimes);
}

function splitByCourse(selectedIndexes, indexTimes) {
  // Split the selectedIndexes into arrays of indexes that belong to the same course
  let courseIndexes = {};
  // console.log('indexTimes', indexTimes);
  // console.log('selectedIndexes', selectedIndexes);
  for (let index of selectedIndexes) {
    // console.log('index', index);
    let course = indexTimes[index].courseCode;
    if (!courseIndexes[course]) {
      courseIndexes[course] = [];
    }
    courseIndexes[course].push(index);
  }
  return courseIndexes;
}

function generateCombinations(courseIndexes) {
  console.log('calling generateCombinations');
  // Using the courseIndexes object, generate all possible combinations of indexes
  // that can be taken together
  let allCombinations = [];
  let courses = Object.keys(courseIndexes);
  let numClasses = courses.length;
  let currentCombination = [];
  let currentIndex = 0;
  generateCombinationsHelper(
    courseIndexes,
    allCombinations,
    currentCombination,
    currentIndex,
    numClasses
  );
  return allCombinations;
}

function generateCombinationsHelper(
  courseIndexes,
  allCombinations,
  currentCombination,
  currentIndex,
  numClasses
) {
  if (allCombinations.length >= 1000) {
    return;
  }
  if (currentIndex === numClasses) {
    allCombinations.push(currentCombination.slice());
    return;
  }
  let course = Object.keys(courseIndexes)[currentIndex];
  let indexes = courseIndexes[course];
  for (let index of indexes) {
    if (allCombinations.length >= 1000) {
      return;
    }
    currentCombination.push(index);
    generateCombinationsHelper(
      courseIndexes,
      allCombinations,
      currentCombination,
      currentIndex + 1,
      numClasses
    );
    currentCombination.pop();
  }
}

function workingSchedules(allCombinations, indexTimes) {
  let validSchedules = [];
  for (let combination of allCombinations) {
    if (isWorkingSchedule(combination, indexTimes)) {
      validSchedules.push(combination);
      if (validSchedules.length === 10) {
        break;
      }
    }
  }
  return validSchedules;
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

export {
  buildSchedules,
  splitByCourse,
  generateCombinations,
  isWorkingSchedule,
  buildValidSchedules,
};
