import React, { useRef } from "react";
import { Form } from "react-router-dom";
import Input from "../UI/Input";
function TripForm({ method, event }) {
  const titleInputRef = useRef();
  const bodyInputRef = useRef();
  return (
    <Form>
      <Input
        ref={titleInputRef}
        label="Title:"
        input={{
          id: "title",
          type: "text",
        }}
      />
      <Input
        ref={bodyInputRef}
        label="Body:"
        input={{
          id: "body",
          type: "text",
        }}
      />
    </Form>
  );
}
export default TripForm;
