import React from "react";
import Title from "../components/Title";
import Table from "../components/table/Table";
import { combineDataByProject } from "../utils/data";

function ResultTable({ data }) {
  const DAY_IN_MILISEC = 1000 * 3600 * 24;

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
  const combinedData = combineDataByProject(data);
  const listWorkingPairs = checkOverlap(combinedData);
  console.log(listWorkingPairs);
  const finalData = combineDataByPairs(listWorkingPairs);
  console.log(finalData);
  const [summary, breakdown] = findLongestPeriod(finalData);

  return (
    <div>
      <Title title="Raw data" />
      <Table
        head={["Employee ID", "Project ID", "Date From", "Date To"]}
        data={data}
      />
      <Title title="Summary" />
      <Table
        head={["Employee ID", "Employee ID", "Total days"]}
        data={summary}
      />
      <Title title="Breakdown" />
      <Table head={["Project ID", "Days"]} data={breakdown} />
    </div>
  );
}

export default ResultTable;
