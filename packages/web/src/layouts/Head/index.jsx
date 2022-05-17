import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
// import "jquery-syotimer";

import jQueryBridget from "jquery-bridget";
import jQuery from "jquery";

// import './script.js'
import "./navbar.css";
import { NavbarLogo } from "../../utils/allImgs";
import { Addshrink } from "../../utils";
import Preloader from "../../components/Preloader";
import data from "../../data/data-layouts/data-Head.json";
import ModeSwitcher from "./ModeSwitcher";

function Head({ Title }) {
  useEffect(() => {
    Addshrink();
  }, [window.pageYOffset]);

  useEffect(() => {
    // jQueryBridget( 'jquery-syotimer', 'jquery' , $ );
    // if ($('.simple_timer').length) {
    //     $('.simple_timer').syotimer({
    //         year: 2025,
    //         month: 3,
    //         day: 9,
    //         hour: 20,
    //         minute: 30
    //     })
    // }
    // $(".simple_timer").syotimer({
    //   year: 2025,
    //   month: 3,
    //   day: 9,
    //   hour: 20,
    //   minute: 30,
    // });
  }, []);

  return (
    <>
      <Preloader Title={Title} />
      <nav
        className="navbar navbar-expand-lg navbar-white fixed-top"
        id="banner"
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
