import React from "react";
import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import TripsList from "../components/Trips/TripsList";

function Trips() {
  const { trips } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={trips}>
        {(loadedTrips) => <TripsList trips={loadedTrips} />}
      </Await>
    </Suspense>
  );
}

export default Trips;

async function loadTrips() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    trips: loadTrips(),
  });
}
