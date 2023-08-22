import React from "react";
import TripForm from "../components/Trips/TripForm";
import { getAuthToken } from "../components/util/auth";
import { json, redirect } from "react-router";
import axios from "axios";

function NewTripPage() {
  return <TripForm />;
}
export default NewTripPage;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  let tripId = params.tripId;
  let url = "http://127.0.0.1/api/trips/";
  if (method === "DELETE") {
    tripId = data.get("id");
    const response = await fetch(url + tripId + "/", {
      method: request.method,
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw json(
        { message: "Could not delete trip." },
        {
          status: 500,
        }
      );
    } else {
      window.history.back();
      return redirect("/");
    }
  }

  /*let eventData = {
    title: data.get("title"),
    body: data.get("body"),
    button: data.get("button"),
    user: data.get("user"),
    image: data.get("image"),
  };*/
  if (method === "PATCH") {
    url = url + tripId + "/";
    await axios
      .patch(url, data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {})
      .catch((err) => {
        throw json({ message: "Could not save trip." }, { status: 500 });
      });
  } else if (method === "POST") {
    await axios
      .post(url, data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {})
      .catch((err) => {
        throw json({ message: "Could not save trip." }, { status: 500 });
      });
  }
  return redirect("/");
}
