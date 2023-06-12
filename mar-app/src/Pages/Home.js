import React, { Suspense } from "react";
import SectionTrips from "../components/Trips/SectionTrips";
import { Await, defer, json, useLoaderData } from "react-router";

function Home() {
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}> Loading... </p>}>
      <Await resolve={events}>
        {(loadedEvents) => <SectionTrips events={loadedEvents} />}
      </Await>
    </Suspense>
  );
  //return <SectionTrips />;
}

export default Home;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({message: 'Could not fetch events.' }), {
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
    events: loadEvents(),
  });
}
