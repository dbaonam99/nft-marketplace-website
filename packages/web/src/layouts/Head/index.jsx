import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { NavbarLogo } from "../../utils/allImgs";
import Preloader from "../../components/Preloader";
import data from "../../data/data-layouts/data-Head.json";
import ModeSwitcher from "./ModeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import useThemeMode from "../../hooks/useThemeMode";
import "./navbar.css";

function Head({ Title }) {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
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
                  {t("header.home")}
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  data-toggle="dropdown"
                >
                  {t("header.discover")}
                </NavLink>
                <div className="dropdown-menu">
                  {data[0]?.dataUp?.map((item, i) => (
                    <NavLink key={i} className="dropdown-item" to={item.path}>
                      {t(item.title)}
                    </NavLink>
                  ))}
                </div>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activity">
                  {t("header.activity")}
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  data-toggle="dropdown"
                >
                  {t("header.pages")}
                </NavLink>
                <div className="dropdown-menu">
                  {data[1].dataDown &&
                    data[1].dataDown.map((item, i) => (
                      <NavLink key={i} className="dropdown-item" to={item.path}>
                        {t(item.title)}
                      </NavLink>
                    ))}
                </div>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  {t("header.contact")}
                </NavLink>
              </li>
              <li className="lh-55px">
                <NavLink to="/connectwallet" className="btn login-btn ml-50">
                  {t("header.connectWallet")}
                </NavLink>
              </li>
              <li className="lh-55px">
                <div className="btn login-btn ml-30">
                  <ModeSwitcher />
                </div>
              </li>
              <li className="lh-55px">
                <div className="btn login-btn ml-30">
                  <LanguageSwitcher />
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
