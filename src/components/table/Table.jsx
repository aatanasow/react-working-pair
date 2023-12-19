import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Table({ head, data }) {
  return (
    <table className="table">
      <TableHead data={head} />
      <TableBody data={data} />
    </table>
  );
}

export default Table;
