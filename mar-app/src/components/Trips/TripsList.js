import React, { useContext, useEffect } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router-dom";

import classes from "./TripsList.module.css";
import Trip from "./Trip";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { showNotification } from "../../store/ui-actions";
import { LoadingContext } from "../../context/loading";

function TripsList({ trips }) {
  const data = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);

  const submit = useSubmit();
  const deleteHandler = (e, trip) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("id", trip.id);
    setLoading(true);
    console.log(loading);
    submit(formData, {
      method: "DELETE",
    });
  };

  useEffect(() => {
    console.log(data);
    if (data != null && data.status === 200) {
      navigate("./");
      let data1 = {
        status: "success",
        title: "Delete",
        message: data.message,
      };
      dispatch(showNotification(data1));
    }
  }, [data]);
  const tripsList = trips.data.map((trip) => (
    <Form method="delete" key={trip.id}>
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
      <Button onClick={(e) => deleteHandler(e, trip)}> Delete </Button>
    </Form>
  ));

  return (
    <Form className={classes.containerForm}>
      <h1> All Trips </h1> {tripsList}
    </Form>
  );
}

export default TripsList;
