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
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch trips." },
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
