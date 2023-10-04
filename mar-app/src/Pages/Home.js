import React, { Suspense } from "react";
import SectionTrips from "../components/Trips/SectionTrips";
import { Await, defer, json, useLoaderData } from "react-router-dom";

function Home() {
  const { trips } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}> Loading... </p>}>
      <Await resolve={trips}>
        {(loadedTrips) => <SectionTrips trips={loadedTrips} />}
      </Await>
    </Suspense>
  );
}

export default Home;

async function loadTrips() {
  const response = await fetch("http://127.0.0.1/api/trips/").catch((error) => {
    throw json(
      { message: "Could not fetch trips." },
      {
        status: 404,
      }
    );
  });
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, "1000");
  });
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
