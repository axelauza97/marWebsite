import React, { useContext, useEffect } from "react";
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import TripsList from "../components/Trips/TripsList";
import { LoadingContext } from "../context/loading";

function Trips() {
  const { trips } = useLoaderData();
  const { loading, setLoading } = useContext(LoadingContext);
  useEffect(() => {
    console.log(loading);
    setLoading(false);
  }, [trips]);

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={trips}>
        {(loadedTrips) => <TripsList trips={loadedTrips} />}
      </Await>
    </Suspense>
  );
}

export default Trips;
