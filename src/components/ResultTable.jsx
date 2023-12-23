import React from "react";
import Title from "../components/Title";
import Table from "../components/table/Table";
import {
  combineDataByProject,
  checkOverlap,
  combineDataByPairs,
  findLongestPeriod,
} from "../utils/data";

function ResultTable({ data }) {
  const combinedByProject = combineDataByProject(data);
  const workingPairs = checkOverlap(combinedByProject);
  let summary = [],
    breakdown = [];
  if (workingPairs.length !== 0) {
    const combinedByPairs = combineDataByPairs(workingPairs);
    [summary, breakdown] = findLongestPeriod(combinedByPairs);
  }

  return (
    <div>
      {/* <Title title="Raw data" />
      <Table
        head={["Employee ID", "Project ID", "Date From", "Date To"]}
        data={data}
      /> */}
      {!summary.length && (
        <>
          <Title title="No Working Pairs Found" />
        </>
      )}
      {!!summary.length && (
        <>
          <Title title="Working Pair Summary" />
          <Table
            head={["Employee 1 ID", "Employee 2 ID", "Total days"]}
            data={summary}
          />
          <Title title="Working Pair Breakdown" />
          <Table head={["Project ID", "Days"]} data={breakdown} />
        </>
      )}
    </div>
  );
}

export default ResultTable;
