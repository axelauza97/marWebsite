import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import Input from "../UI/Input";
import classes from "./TripForm.module.css";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { showNotification } from "../../store/ui-actions";

function TripForm({ method, trip }) {
  const titleInputRef = useRef(trip ? trip.title : "");
  const bodyInputRef = useRef(trip ? trip.body : "");
  const [selectedImage, setSelectedImage] = useState(null);

  const submit = useSubmit();
  const navigation = useNavigation();
  const data = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
    if (data != null && data.status === 201) {
      let message = {
        status: "success",
        title: "Created Post",
        message: data.data.message,
      };
      dispatch(showNotification(message));
      navigate("../");
    } else if (data != null && data.status === 200) {
      let message = {
        status: "success",
        title: "Updated Post",
        message: data.data.message,
      };
      dispatch(showNotification(message));
      navigate("../../");
    }
  }, [data]);

  const isSubmitting = navigation.state === "submitting";
  const methodHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("title", titleInputRef.current.value);
    formData.append("body", bodyInputRef.current.value);
    formData.append("button", trip ? trip.button : titleInputRef.current.value);
    formData.append("user", localStorage.getItem("pk"));
    if (selectedImage != null) {
      formData.append("image", selectedImage);
    }
    if (method === "PATCH") {
      submit(formData, { method: method, encType: "application/json" });
    } else {
      submit(formData, {
        method: "POST",
        //replace: true,
        encType: "application/json",
      });
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
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
      <div>
        <label htmlFor="image">Select Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
      </div>

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
