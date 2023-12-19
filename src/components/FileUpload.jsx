import React from "react";

function FileUpload({ changeHandler }) {
  return (
    <div className="load">
      <input type="file" onChange={changeHandler} />
    </div>
  );
}

export default FileUpload;
