import { Fragment, useState } from "react";
import classes from "./Header.module.css";
import ecosystemsImage from "../../assets/ecoSystems.png";
import marImage from "../../assets/marLogo.svg";
const Header = (props) => {
  const [menu, setMenu] = useState("");
  const onMenuToggle = (event) => {
    if (menu == classes.active) {
      setMenu("");
    } else {
      setMenu(classes.active);
    }
  };
  const closeMenu = (event) => {
    setMenu("");
  };

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
        <nav className={`${classes.nav} ${menu}`}>
          <ul>
            <li>
              <a href="#home" onClick={closeMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#team" onClick={closeMenu}>
                About
              </a>
            </li>
            <li>
              <a href="#gallery" onClick={closeMenu}>
                Gallery
              </a>
            </li>
            <li>
              <a href="#problem" onClick={closeMenu}>
                Blog
              </a>
            </li>
            <li>
              <a href="#contact" onClick={closeMenu}>
                Contact
              </a>
            </li>
            <li>
              <a href="#trips" onClick={closeMenu} className={classes.btn}>
                Book an experience
              </a>
            </li>
          </ul>
        </nav>
        <div className={`${classes.hamburger} ${menu}`} onClick={onMenuToggle}>
          <span className={classes.bar}></span>
          <span className={classes.bar}></span>
          <span className={classes.bar}></span>
        </div>
      </section>
    </Fragment>
  );
};
export default Header;
