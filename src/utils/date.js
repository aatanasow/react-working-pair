const DAY_IN_MILISEC = 1000 * 3600 * 24;

function isValidDate(string) {
  const date = new Date(string);
  return !isNaN(date.getTime());
}

function isValidRange(date1, date2) {
  const start = new Date(date1).getTime();
  const end = new Date(date2).getTime();
  return start <= end;
}

function countDays(dateStart, dateEnd) {
  let date1 = new Date(dateStart);
  let date2 = new Date(dateEnd);

  let difference = date2.getTime() - date1.getTime();
  return Math.round(difference / DAY_IN_MILISEC) + 1; //add the last working day
}

function findOverlapDays(arr, task) {
  let i, j;
  const overlapArr = [];
  for (i = 0; i < arr.length - 1; i++) {
    for (j = i + 1; j < arr.length; j++) {
      /* console.log(
        arr[i][1],
        "-",
        arr[i][2],
        " | ",
        arr[j][1],
        "-",
        arr[j][2]
      ); */

      const range1Start = new Date(arr[i][1]);
      const range1End = new Date(arr[i][2]);

      const range2Start = new Date(arr[j][1]);
      const range2End = new Date(arr[j][2]);

      if (range1Start < range2End && range2Start < range1End) {
        const maxStart = new Date(Math.max(range1Start, range2Start));
        const minEnd = new Date(Math.min(range1End, range2End));
        //console.log("The date ranges overlap.", maxStart, " - ", minEnd);
        let daysOverlap = countDays(maxStart, minEnd);
        if (+arr[i][0] < +arr[j][0]) {
          overlapArr.push([arr[i][0], arr[j][0], task, daysOverlap]);
        } else {
          overlapArr.push([arr[j][0], arr[i][0], task, daysOverlap]);
        }
      } else {
        //console.log("The date ranges do not overlap.");
      }
    }
  }
  return overlapArr;
}

export { isValidDate, isValidRange, findOverlapDays };
