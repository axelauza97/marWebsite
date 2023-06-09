import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  let input;
  if (props.input.type == "textarea") {
    input = <textarea ref={ref} {...props.input} />;
  } else if (props.input.type == "radio") {
    input = (
      <input
        checked={props.state == props.input.value}
        onChange={props.onChange}
        {...props.input}
      />
    );
  } else {
    input = <input ref={ref} {...props.input} />;
  }
  const classDiv = `${
    props.input.type != "radio" && props.input.type != "checkbox"
      ? classes.input_container
      : ""
  }`;

  return (
    <div className={`${classDiv}  ${props.className}`}>
      <label htmlFor={props.input.id}> {props.label} </label> {input}{" "}
    </div>
  );
});
export default Input;
