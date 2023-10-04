import React, { useEffect } from "react";

import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { getTokenDuration } from "../components/util/auth";
import { useSelector } from "react-redux";
import Notification from "../components/UI/Notification";
import { Loading } from "../components/UI/Loading";
import { LoadingProvider } from "../context/loading";

function Root() {
  const token = useLoaderData();
  const submit = useSubmit();
  const notification = useSelector((state) => state.ui.notification);
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);
  //console.log(notification);

  return (
    <>
      <LoadingProvider>
        <Header />
        <Loading />
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
          show={notification.show}
        />
        <Outlet />
        <Footer />
      </LoadingProvider>
    </>
  );
}

export default Root;
