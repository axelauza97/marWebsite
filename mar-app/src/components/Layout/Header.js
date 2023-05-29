import { Fragment } from "react";
import classes from "./Header.module.css";
import ecosystemsImage from "../../assets/ecoSystems.png";
import marImage from "../../assets/marLogo.svg";
const Header = (props) => {
  return (
    <Fragment>
      <section className={classes.info_header}>
        <img src={ecosystemsImage} alt="" />
        <article>
          <h1>Marine Awareness Retreats</h1>
          <p>
            We are an organization focused on educating and raising awareness
            about the importance of our ocean’s ecosystems. We create
            life-altering experiences that literally change perceptions and
            perspectives. Join us for an incredible trip that will educate and
            forever change you.
          </p>
          <button className={classes.info_button}>
            Learn more about our trips
          </button>
        </article>
      </section>
      <section className={classes.navWrap}>
        <img src={marImage} alt="MAR logo" className={classes.logo} />
        <input
          type="checkbox"
          id="navToggle"
          className={classes.inputNavToggle}
        />
        <label htmlFor="navToggle" className={classes.navToggleLabel}>
          <span></span>
        </label>
        <nav className={classes.nav}>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#team">About</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#problem">Blog</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#trips" className={classes.btn}>
                Book an experience
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </Fragment>
  );
};
export default Header;
