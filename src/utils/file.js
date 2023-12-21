import { stringToArray, arrayToMatrix, replaceNull } from "./data";
import { openModal } from "./modal";
import { isValidDate, isValidRange } from "./date";

function readFile(e) {
  return new Promise((resolve, reject) => {
    const file = e.target.files[0];
    const errors = [];

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function () {
      let dataMatrix = [];
      const dataArray = stringToArray(reader.result);
      dataMatrix = arrayToMatrix(dataArray);

      // check for errors in the data
      dataMatrix.forEach((row, index) => {
        if (row.length !== 4) {
          errors.push(`Missing data on row ${index + 1}`);
        } else if (row[2] === "NULL") {
          errors.push(`Start date on row ${index + 1} cannot be NULL`);
        } else if (
          !isValidDate(row[2]) ||
          (!isValidDate(row[3]) && row[3] !== "NULL")
        ) {
          errors.push(`Incorrect date on row ${index + 1}`);
        } else if (!isValidRange(row[2], row[3]) && row[3] !== "NULL") {
          errors.push(`Incorrect date range on row ${index + 1}`);
        }
      });

      // display errors
      if (errors.length) {
        errors.forEach((error) => console.error(error));
        openModal();
        reject(errors);
      }

      // no errors -> replace NULL
      const nullReplaced = replaceNull(dataMatrix);
      resolve(nullReplaced);
    };
    reader.onerror = reject;
  });
}

export { readFile };
