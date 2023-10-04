import React, { useContext } from "react";
import classes from "./Loading.module.css";
import { LoadingContext } from "../../context/loading";

export function Loading() {
  const { loading } = useContext(LoadingContext);

  return (
    <section
      className={`${classes.container} ${
        loading ? classes.show : classes.close
      }`}
    >
      <aside className={classes.loading}>Loading...</aside>
    </section>
  );
}
