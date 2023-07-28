import React from "react";
import classes from "./SectionTrips.module.css";
import Trip from "./Trip";

const SectionTrips = (props) => {
  console.log(props);
  const tripsList = props.trips.data.map((trip) => (
    <Trip
      key={trip.id}
      title={trip.title}
      body={trip.body}
      button={trip.button}
      image={trip.image}
    />
  ));
  return (
    <section className={classes.section_trips}>
      <article className={classes.trip_article}>
        <h1> Our trips </h1>
        <p>
          We have trips worldwide; incredible experiences that will not only
          provide unique animal interactions but will also introduce you to
          local heroes that are making a difference in their communities each
          and every day.Our trips educate and connect you with conservationists
          that are making changes in small communities.Little steps with huge
          impacts!
        </p>
      </article>
      <div className={classes.trips}> {tripsList} </div>
    </section>
  );
};
export default SectionTrips;
