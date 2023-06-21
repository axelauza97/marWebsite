import React, { Fragment, useState } from "react";
import classes from "./Header.module.css";
import ecosystemsImage from "../../assets/ecoSystems.png";
import marImage from "../../assets/marLogo.svg";
import { NavLink, useLoaderData, useSubmit } from "react-router-dom";
const Header = (props) => {
  const [menu, setMenu] = useState("");
  const token = useLoaderData();
  const submit = useSubmit();
  const onMenuToggle = (event) => {
    if (menu === classes.active) {
      setMenu("");
    } else {
      setMenu(classes.active);
    }
  };
  const closeMenu = (event) => {
    setMenu("");
  };
  const logOut = () => {
    const proceed = window.confirm("Are you sure to logout?");
    if (proceed) {
      submit(null, {
        method: "post",
        action: "/logout",
        replace: true,
      });
    }
  };
  return (
    <Fragment>
      <section className={classes.info_header}>
        <img src={ecosystemsImage} alt="" />
        <article>
          <h1 className={classes.shadow}> Marine Awareness Retreats </h1>
          <p className={classes.shadow}>
            We are an organization focused on educating and raising awareness
            about the importance of our ocean’ s ecosystems.We create life -
            altering experiences that literally change perceptions and
            perspectives.Join us for an incredible trip that will educate and
            forever change you.
          </p>
          <button className={classes.info_button}>
            Learn more about our trips
          </button>
        </article>
      </section>
      <section className={classes.navWrap}>
        <img src={marImage} alt="MAR logo" className={classes.logo} />
        <nav className={`${classes.nav} ${menu}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>
            {token && (
              <li>
                <NavLink to="/trips" onClick={closeMenu}>
                  Trips
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <NavLink className={classes.btn} onClick={logOut}>
                  Log Out
                </NavLink>
              </li>
            )}
            {!token && (
              <li>
                <NavLink to="/auth" className={classes.btn} onClick={closeMenu}>
                  Create Account / Log in
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className={`${classes.hamburger} ${menu}`} onClick={onMenuToggle}>
          <span className={classes.bar}> </span>
          <span className={classes.bar}> </span>
          <span className={classes.bar}> </span>
        </div>
      </section>
    </Fragment>
  );
};
export default Header;
