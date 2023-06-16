import React, { useEffect, useRef, useState } from "react";
import classes from "./AuthenticationForm.module.css";
import { useActionData, useNavigate, useSubmit } from "react-router-dom";
import Input from "../UI/Input";
import Button from "../UI/Button";

function AuthenticationForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const submit = useSubmit();
  const data = useActionData();

  const navigate = useNavigate();

  useEffect(() => {
    navigate({
      search: "?mode=login",
    });
  }, []);

  const modeHandler = () => {
    setIsLogin((prev) => !prev);
    navigate({
      search: `?mode=${isLogin ? "signup" : "login"}`,
    });
  };
  const postHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("email", emailInputRef.current.value);
    formData.append("password", passwordInputRef.current.value);
    submit(formData, { action: "", method: "post" });
  };
  console.log(data);
  return (
    <div className={classes.containerAuth}>
      {data && data.message && alert(data.message)}
      {data &&
        data.errors &&
        alert(`${Object.values(data.errors).map((err) => err)}`)}

      <h1> {isLogin ? "Log In" : "Sign Up"} </h1>
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
        <Button className={classes.form_button} onClick={modeHandler}>
          {isLogin ? "Sign Up" : "Login"}
        </Button>
        <Button className={classes.form_button} onClick={postHandler}>
          {isLogin ? "Login" : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default AuthenticationForm;
