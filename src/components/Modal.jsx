import React from "react";
import Title from "./Title";

function Modal({ errors, changeHandler }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={changeHandler}>
          &times;
        </span>
        <Title title="Errors found in CSV file. Please fix them and try again." />
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>
    </div>
  );
}

export default Modal;
