import React, { Suspense } from "react";
import TripForm from "../components/Trips/TripForm";
import { Await, defer, json, useRouteLoaderData } from "react-router";

function TripDetailPage() {
  const { trip } = useRouteLoaderData("trip-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}> Loading... </p>}>
        <Await resolve={trip}>
          {(loadedTrip) => <TripForm method="PATCH" trip={loadedTrip} />}
        </Await>
      </Suspense>
    </>
  );
}
export default TripDetailPage;

async function loadTrip(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected trip." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function loader({ request, params }) {
  const id = params.tripId;

  return defer({
    trip: await loadTrip(id),
  });
}
