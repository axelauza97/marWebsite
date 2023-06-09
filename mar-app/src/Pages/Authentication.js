import React, { Fragment, useRef } from "react";
import classes from "./Authentication.module.css";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

function Authentication() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  return (
    <div className={classes.containerAuth}>
      <h1>Log In</h1>
      <Input
        className={classes.form_input}
        ref={emailInputRef}
        label="Email"
        input={{ id: "email", type: "text" }}
      />
      <Input
        className={classes.form_input}
        ref={passwordInputRef}
        label="Password"
        input={{ id: "password", type: "password" }}
      />
      <div className={classes.containerButton}>
        <Button className={classes.form_button}>Create New user</Button>
        <Button className={classes.form_button}>Save</Button>
      </div>
    </div>
  );
}

export default Authentication;
