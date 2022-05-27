import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { NavbarLogo } from "../../utils/allImgs";
import Preloader from "../../components/Preloader";
import data from "../../data/data-layouts/data-Head.json";
import ModeSwitcher from "./ModeSwitcher";
import useThemeMode from "../../hooks/useThemeMode";
import "./navbar.css";

function Head({ Title }) {
  const isLightMode = useThemeMode();
  const navbarRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.pageYOffset > 20) {
        navbarRef?.current?.classList.add(
          isLightMode ? "shrink" : "shrink-dark"
        );
      } else {
        navbarRef?.current?.classList.remove(
          isLightMode ? "shrink" : "shrink-dark"
        );
      }
    });
  }, [isLightMode]);

  return (
    <>
      <Preloader Title={Title} />
      <nav
        className="navbar navbar-expand-lg navbar-white fixed-top"
        ref={navbarRef}
      >
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <span>
              <img src={NavbarLogo} alt="logo" />
            </span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  data-toggle="dropdown"
                >
                  Discover
                </NavLink>
                <div className="dropdown-menu">
                  {data[0].dataUp &&
                    data[0].dataUp.map((item, i) => (
                      <NavLink key={i} className="dropdown-item" to={item.path}>
                        {item.title}
                      </NavLink>
                    ))}
                </div>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activity">
                  Activity
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  data-toggle="dropdown"
                >
                  Pages
                </NavLink>
                <div className="dropdown-menu">
                  {data[1].dataDown &&
                    data[1].dataDown.map((item, i) => (
                      <NavLink key={i} className="dropdown-item" to={item.path}>
                        {item.title}
                      </NavLink>
                    ))}
                </div>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="lh-55px">
                <NavLink to="/connectwallet" className="btn login-btn ml-50">
                  Connect Wallet
                </NavLink>
              </li>
              <li className="lh-55px">
                <div className="btn login-btn ml-50">
                  <ModeSwitcher />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Head;
