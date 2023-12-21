import { findOverlapDays } from "./date";

const CURRENT_DATE = new Date().toJSON().slice(0, 10);

function stringToArray(string) {
  return string.split(/(\r\n|\r|\n)/g);
}

function arrayToMatrix(array) {
  return array
    .filter((row) => row.trim().length !== 0)
    .map((row) => row.split(", ").map((cell) => cell.trim()));
}

function replaceNull(matrix) {
  return matrix.map((row) =>
    row.map((cell) => (cell === "NULL" ? CURRENT_DATE : cell))
  );
}

function combineDataByProject(data) {
  const dataReduced = data.reduce((acc, current) => {
    if (acc[current[1]]) {
      acc[current[1]] = [
        ...acc[current[1]],
        [current[0], current[2], current[3]],
      ];
    } else {
      acc[current[1]] = [[current[0], current[2], current[3]]];
    }
    return acc;
  }, {});
  //return Object.entries(dataReduced).map((arr) => [arr[0], ...arr[1]]);
  return Object.entries(dataReduced);
}

function combineDataByPairs(data) {
  const dataReduced = data.reduce((acc, current) => {
    const key = current[0] + ":" + current[1];
    if (acc[key]) {
      acc[key][0] = acc[key][0] + current[3];
      acc[key][1].push([current[2], current[3]]);
    } else {
      acc[key] = [current[3], [[current[2], current[3]]]];
    }
    return acc;
  }, {});
  return Object.entries(dataReduced).map((arr) => [
    ...arr[0].split(":"),
    ...arr[1],
  ]);
  //return Object.entries(dataReduced);
}

function checkOverlap(arr) {
  //console.log(arr);
  let workingPairs = [];
  arr.forEach((el) => {
    //console.log(el[1].length);
    if (el[1].length > 1) {
      let overlapDays = findOverlapDays(el[1], el[0]);
      if (overlapDays.length > 0) {
        workingPairs.push(...overlapDays);
      }
    }
  });
  //console.log(workingPairs);
  return workingPairs;
}

function findLongestPeriod(data) {
  let topDays = 0;
  let topIndex = -1;
  data.forEach((row, index) => {
    if (row[2] > topDays) {
      topDays = row[2];
      topIndex = index;
    }
  });
  //console.log("topDays", topDays, "-", topIndex);
  return [
    [[data[topIndex][0], data[topIndex][1], data[topIndex][2]]],
    data[topIndex][3],
  ];
}

export {
  stringToArray,
  arrayToMatrix,
  combineDataByProject,
  replaceNull,
  combineDataByPairs,
  checkOverlap,
  findLongestPeriod,
};
