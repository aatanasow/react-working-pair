import React from "react";

function Modal({ errors, changeHandler }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={changeHandler}>
          &times;
        </span>
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>
    </div>
  );
}

export default Modal;
