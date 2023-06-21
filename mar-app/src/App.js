import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./Pages/Root";
import Home, { loader as tripsLoader } from "./Pages/Home";
import Authentication, {
  action as authenticationAction,
} from "./Pages/Authentication";
import NewTripPage, {
  action as manipulateTripAction,
} from "./Pages/NewTripPage";
import { checkAuthLoader, tokenLoader } from "./components/util/auth";
import { action as logoutAction } from "./Pages/Logout";
import TripRoot from "./Pages/TripRoot";
import Trips from "./Pages/Trips";
import TripDetailPage, {
  loader as tripDetailLoader,
} from "./Pages/TripDetailPage";
import ErrorPage from "./Pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home />, loader: tripsLoader },
      {
        path: "trips",
        element: <TripRoot />,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <Trips />,
            loader: tripsLoader,
          },
          {
            path: ":tripId",
            id: "trip-detail",
            loader: tripDetailLoader,
            action: manipulateTripAction,
            children: [
              {
                path: "edit",
                element: <TripDetailPage />,
                action: manipulateTripAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewTripPage />,
            action: manipulateTripAction,
          },
        ],
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "auth",
        element: <Authentication />,
        action: authenticationAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
