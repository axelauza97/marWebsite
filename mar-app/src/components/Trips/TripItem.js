import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";

import classes from "./TripItem.module.css";
import React from "react";
import Button from "../UI/Button";

function TripItem({ trip }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.trip}>
      <img src={require(`../../assets/${trip.image}.jpg`)} alt={trip.title} />{" "}
      <h1> {trip.title} </h1>
      <p> {trip.body} </p>
      <p>{trip.button}</p>
      {token && (
        <div>
          <Link to="edit">
            <Button>Edit</Button>
          </Link>
          <Button onClick={startDeleteHandler}> Delete </Button>
        </div>
      )}
    </article>
  );
}

export default TripItem;
