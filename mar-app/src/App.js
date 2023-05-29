import { Fragment } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import SectionTrips from "./components/Trips/SectionTrips";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <Fragment>
      <Header />
      <SectionTrips />
      <Footer />
    </Fragment>
  );
}

export default App;
