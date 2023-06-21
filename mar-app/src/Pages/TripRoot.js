import React from "react";
import { Outlet } from "react-router-dom";
import TripNavigation from "../components/Layout/TripNavigation";

function TripRoot() {
  return (
    <>
      <TripNavigation />
      <Outlet />
    </>
  );
}

export default TripRoot;
