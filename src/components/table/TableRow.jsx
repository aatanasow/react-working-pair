import React from "react";
import TableCell from "./TableCell";

function TableRow({ data, cellType }) {
  return (
    <tr>
      {data.map((field, index) => (
        <TableCell value={field} type={cellType} key={field + index} />
      ))}
    </tr>
  );
}

export default TableRow;
