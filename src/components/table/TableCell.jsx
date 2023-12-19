import React from "react";

const TableCell = ({ value, type = "cell" }) => {
  if (type === "heading") {
    return <th>{value}</th>;
  }
  return <td>{value}</td>;
};

export default TableCell;
