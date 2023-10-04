import React from "react";
import TripForm from "../components/Trips/TripForm";
import { getAuthToken } from "../components/util/auth";
import axios from "axios";
import { json, redirect } from "react-router-dom";

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
  switch (method) {
    case "POST": {
      const response = await axios
        .post(url, data, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw json({ message: "Could not save trip." }, { status: 500 });
        });
      return response;
      //return redirect("/");
    }
    case "PATCH": {
      url = url + tripId + "/";
      const response = await axios
        .patch(url, data, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw json({ message: "Could not save trip." }, { status: 500 });
        });
      return response;
    }
    case "DELETE": {
      tripId = data.get("id");
      const response = await fetch(url + tripId + "/", {
        method: request.method,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const resData = await response.json();

      if (!response.ok) {
        throw json(
          { message: "Could not delete trip." },
          {
            status: 500,
          }
        );
      } else {
        return resData;
      }
    }
    default: {
    }
  }
  return redirect("/");
}
