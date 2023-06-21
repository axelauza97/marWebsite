import React from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./TripNavigation.module.css";

function TripNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        <li>
          <NavLink
            to="/trips"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <h3> All Trips </h3>
          </NavLink>
        </li>
        {token && (
          <li>
            <NavLink
              to="/trips/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <h3> New Trip </h3>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default TripNavigation;
