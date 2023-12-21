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
