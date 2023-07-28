import React, { Suspense } from "react";
import SectionTrips from "../components/Trips/SectionTrips";
import { Await, defer, json, useLoaderData } from "react-router";

function Home() {
  const { trips } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}> Loading... </p>}>
      <Await resolve={trips}>
        {(loadedTrips) => <SectionTrips trips={loadedTrips} />}
      </Await>
    </Suspense>
  );
  //return <SectionTrips />;
}

export default Home;

async function loadTrips() {
  const response = await fetch("http://127.0.0.1:8000/api/trips/");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch trips." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export function loader() {
  return defer({
    trips: loadTrips(),
  });
}
