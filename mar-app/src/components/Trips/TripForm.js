import React, { useRef } from "react";
import { Form, useNavigation, useSubmit } from "react-router-dom";
import Input from "../UI/Input";
import classes from "./TripForm.module.css";
import Button from "../UI/Button";

function TripForm({ method, trip }) {
  const titleInputRef = useRef(trip ? trip.title : "");
  const bodyInputRef = useRef(trip ? trip.body : "");
  const submit = useSubmit();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const methodHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("title", titleInputRef.current.value);
    formData.append("body", bodyInputRef.current.value);
    formData.append("image", trip ? trip.image : "trip01");
    formData.append("button", trip ? trip.button : titleInputRef.current.value);
    if (method === "PATCH") {
      submit(formData, { method: method });
    } else {
      submit(formData, { method: "post", replace: true });
    }
  };

  return (
    <Form className={classes.containerForm}>
      <h1> {method ? "Edit" : "New Trip"} </h1>
      <Input
        ref={titleInputRef}
        label="Title:"
        input={{
          id: "title",
          type: "text",
          defaultValue: `${trip ? titleInputRef.current : ""}`,
        }}
      />
      <Input
        ref={bodyInputRef}
        label="Body:"
        input={{
          id: "message",
          rows: 3,
          type: "textarea",
          defaultValue: `${trip ? bodyInputRef.current : ""}`,
        }}
      />
      <Button
        className={classes.form_button}
        onClick={methodHandler}
        disabled={isSubmitting}
      >
        Save
      </Button>
    </Form>
  );
}
export default TripForm;
