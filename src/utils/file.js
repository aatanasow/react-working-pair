import { stringToArray, arrayToMatrix, replaceNull } from "./data";
import { openModal } from "./modal";
import {
  isValidDate,
  isValidRange,
  CURRENT_DATE,
  mergeOverlapData,
} from "./date";

function validateData(data) {
  const err = [];
  data.forEach((row, index) => {
    if (row.length !== 4) {
      err.push(`Missing data on row ${index + 1}`);
    } else if (row[2] === "NULL") {
      err.push(`Start date on row ${index + 1} cannot be NULL`);
    } else if (
      !isValidDate(row[2]) ||
      (!isValidDate(row[3]) && row[3] !== "NULL")
    ) {
      err.push(`Incorrect date on row ${index + 1}`);
    } else if (!isValidRange(row[2], row[3]) && row[3] !== "NULL") {
      err.push(`Incorrect date range on row ${index + 1}`);
    } else if (
      new Date(row[2]) > CURRENT_DATE ||
      (new Date(row[3]) > CURRENT_DATE && row[3] !== "NULL")
    ) {
      err.push(`Date is in the future on row ${index + 1}`);
    }
  });
  return err;
}

function readFile(e) {
  return new Promise((resolve, reject) => {
    const file = e;
    let errors = [];

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
      let dataMatrix = [];
      const dataArray = stringToArray(reader.result);
      dataMatrix = arrayToMatrix(dataArray);

      errors = validateData(dataMatrix);

      // display errors
      if (errors.length) {
        //errors.forEach((error) => console.error(error));
        openModal();
        reject(errors);
      }

      // no errors -> replace NULL and merge overlapped data
      const nullReplaced = replaceNull(dataMatrix);
      const mergedData = mergeOverlapData(nullReplaced);

      resolve(mergedData);
    };
    reader.onerror = reject;
  });
}

function dragOverHandler(e) {
  e.preventDefault();
}
function dragEnterHandler(e) {
  document.getElementById("container").classList.add("drag-active");
}
function dragLeaveHandler(e) {
  document.getElementById("container").classList.remove("drag-active");
}

export { readFile, dragOverHandler, dragEnterHandler, dragLeaveHandler };
