import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./Pages/Root";
import Home, { loader as eventsLoader } from "./Pages/Home";
import Authentication from "./Pages/Authentication";
import NewTripPage from "./Pages/NewTripPage";

const router = createBrowserRouter([{
  path: "/",
  element: < Root />,
  id: "root",
  children: [
    { index: true, element: < Home />, loader: eventsLoader },
    { path: "auth", element: < Authentication /> },
    { path: "trips", children: [{ index: true, element: < NewTripPage /> }] },
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