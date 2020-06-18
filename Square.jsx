import React from "react";

function Square(props) {
  return (
    <button
      id={props.id}
      className="col btn btn-secondary"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
