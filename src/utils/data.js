function stringToArray(string) {
  return string.split(/(\r\n|\r|\n)/g);
}

function arrayToMatrix(array) {
  return array
    .filter((row) => row.trim().length !== 0)
    .map((row) => row.split(", ").map((cell) => cell.trim()));
}

export { stringToArray, arrayToMatrix };
