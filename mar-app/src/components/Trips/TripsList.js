import React from "react";
import { Form, Link, useSubmit } from "react-router-dom";

import classes from "./TripsList.module.css";
import Trip from "./Trip";
import Button from "../UI/Button";

function TripsList({ trips }) {
  const submit = useSubmit();
  const deleteHandler = (trip) => {
    let formData = new FormData();
    formData.append("id", trip.id);
    submit(formData, {
      method: "delete",
      //action: `/trips/${trip.id}`,
      //action: `/trips/${trip.id}/edit`,
      replace: true,
    });
  };
  const tripsList = trips.data.map((trip) => (
    <div key={trip.id}>
      <Trip
        key={trip.id}
        title={trip.title}
        body={trip.body}
        button={trip.button}
        image={trip.image}
      />
      <Link to={`/trips/${trip.id}/edit`}>
        <Button> Edit </Button>
      </Link>
      <Button onClick={() => deleteHandler(trip)}> Delete </Button>
    </div>
  ));

  return (
    <Form className={classes.containerForm}>
      <h1> All Trips </h1> {tripsList}
    </Form>
  );
}

export default TripsList;
