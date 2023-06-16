import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./Pages/Root";
import Home, { loader as eventsLoader } from "./Pages/Home";
import Authentication, { action as authenticationAction } from "./Pages/Authentication";
import NewTripPage from "./Pages/NewTripPage";
import { tokenLoader } from "./components/util/auth";
import { action as logoutAction } from './Pages/Logout';

const router = createBrowserRouter([{
  path: "/",
  element: < Root />,
  id: "root",
  loader: tokenLoader,
  children: [
    { index: true, element: < Home />, loader: eventsLoader },
    { path: "auth", element: < Authentication />, action: authenticationAction },
    { path: "trips", children: [{ index: true, element: < NewTripPage /> }] },
    {
      path: 'logout',
      action: logoutAction,
    },
  ],
},]);

function App() {
  return <RouterProvider router={router}
  />;
}

export default App;

/*export default App;
function App() {
  return (
    <Fragment>
      <Header />
      <SectionTrips />
      <Footer />
    </Fragment>
  );
}*/