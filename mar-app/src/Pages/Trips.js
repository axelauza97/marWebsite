import React from "react";
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
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
