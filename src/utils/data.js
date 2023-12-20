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

export { stringToArray, arrayToMatrix, combineDataByProject, replaceNull };
