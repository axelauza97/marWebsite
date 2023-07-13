import React from "react";
import TripForm from "../components/Trips/TripForm";
import { getAuthToken } from "../components/util/auth";
import { json, redirect } from "react-router";

function NewTripPage() {
  return <TripForm />;
}
export default NewTripPage;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  const tripId = params.tripId;

  if (method === "DELETE") {
    const response = await fetch(
      "http://127.0.0.1:8000/api/trip/delete/" + tripId + "/",
      {
        method: request.method,
        headers: {
          Authorization: "JWT " + token,
        },
      }
    );
    if (!response.ok) {
      throw json(
        { message: "Could not delete trip." },
        {
          status: 500,
        }
      );
    }
    return redirect("/");
  }

  let url = "http://127.0.0.1:8000/api/trip/";
  let eventData = {
    title: data.get("title"),
    body: data.get("body"),
    button: data.get("button"),
  };
  if (method === "PATCH") {
    url = url + "update/" + tripId + "/";
  } else {
    url = url + "create/";
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT " + token,
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save trip." }, { status: 500 });
  }

  return redirect("/");
}
