import React, { useEffect, useRef, useState } from "react";
import classes from "./AuthenticationForm.module.css";
import {
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Input from "../UI/Input";
import Button from "../UI/Button";

function AuthenticationForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const submit = useSubmit();
  const data = useActionData();

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    navigate({
      search: "?mode=login",
    });
    console.log("effect");
  }, []);

  const modeHandler = () => {
    navigate({
      search: `?mode=${isLogin ? "signup" : "login"}`,
    });
    setIsLogin((prev) => !prev);
  };
  const postHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("email", emailInputRef.current.value);
    formData.append("password", passwordInputRef.current.value);
    submit(formData, { method: "post", replace: true });
  };
  return (
    <div className={classes.containerAuth}>
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
        <Button
          className={classes.form_button}
          onClick={postHandler}
          disabled={isSubmitting}
        >
          {isLogin ? "Login" : "Save"}
        </Button>
      </div>
      {data && <div>{data.message}</div>}
      {data && data.errors && (
        <div>{Object.values(data.errors).map((err) => err)} </div>
      )}
    </div>
  );
}

export default AuthenticationForm;
