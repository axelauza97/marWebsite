import { useRouteError } from "react-router-dom";

import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";
  console.log(error.data);

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <Header />
      <h1>{title}</h1>
      <p> {message} </p>
      <Footer />
    </>
  );
}

export default ErrorPage;
