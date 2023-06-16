import React from "react";
import classes from "./Button.module.css";

function Button(props) {
  return (
    <button
      className={`${classes.form_button}  ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
