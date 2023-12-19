import React from "react";

const Modal = ({ errors }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>
    </div>
  );
};

export default Modal;
