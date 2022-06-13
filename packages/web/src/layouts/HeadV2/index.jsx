import React, { useEffect, useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import { NavLink, useHistory } from "react-router-dom";
import { NavbarLogo } from "../../utils/allImgs";
import Preloader from "../../components/Preloader";
import data from "../../data/data-layouts/data-Head.json";
import ModeSwitcher from "./ModeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import useThemeMode from "../../hooks/useThemeMode";
import "./navbar.css";
import clsx from "clsx";
import { getUserInfo } from "../../queries/User";

function Head({ Title }) {
  let { location } = useHistory();
  const { isAuthenticated, user } = useMoralis();
  const [active, setActive] = useState(false);
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const navbarRef = useRef();
  const [userInfo, setUserInfo] = useState({});

  const itemDetailPath =
    location.pathname.split("/").length > 2 &&
    location.pathname.split("/")[1] === "item-details";

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

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [active]);

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(user.get("ethAddress"));
      setUserInfo(_userInfo);
    })();
  }, [user]);

  const toggleMenu = () => setActive(!active);

  console.log("userInfo", userInfo);

  return (
    <>
      <Preloader Title={Title} />
      <div className="d-block d-lg-none">
        <div
          className={clsx(
            isLightMode ? "drawer-overlay-light" : "drawer-overlay",
            active && "drawer-active"
          )}
          onClick={toggleMenu}
        ></div>
        <div className={active ? "drawer-main drawer-active" : "drawer-main"}>
          <div
            className={
              isLightMode
                ? "drawer-main-container drawer-main-container-light"
                : "drawer-main-container"
            }
          >
            <ul>
              <li className="mb-1">
                <NavLink
                  className={isLightMode ? "text-dark" : "w-text"}
                  to="/"
                >
                  {t("header.home")}
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  className={isLightMode ? "text-dark" : "w-text"}
                  to="#"
                >
                  {t("header.discover")}
                </NavLink>
                <div>
                  {data[0]?.dataUp?.map((item, i) => (
                    <NavLink
                      key={i}
                      className={
                        isLightMode ? "small-li text-muted" : "small-li"
                      }
                      to={item.path}
                    >
                      {t(item.title)}
                    </NavLink>
                  ))}
                </div>
              </li>
              <li className="mb-1">
                <NavLink
                  className={isLightMode ? "text-dark" : "w-text"}
                  to="/activity"
                >
                  {t("header.activity")}
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  className={isLightMode ? "text-dark" : "w-text"}
                  to="#"
                >
                  {t("header.pages")}
                </NavLink>
                <div>
                  {data[1].dataDown &&
                    data[1].dataDown.map((item, i) => (
                      <NavLink
                        key={i}
                        className={
                          isLightMode ? "small-li text-muted" : "small-li"
                        }
                        to={item.path}
                      >
                        {t(item.title)}
                      </NavLink>
                    ))}
                </div>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={isLightMode ? "text-dark" : "w-text"}
                >
                  {t("header.contact")}
                </NavLink>
              </li>
            </ul>
            <div className="actions">
              <ModeSwitcher />
              <div
                className={isLightMode ? "close-menu text-dark" : "close-menu"}
                onClick={toggleMenu}
              >
                x
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <nav
        className="navbar navbar-expand-lg navbar-white fixed-top navbarV2"
        ref={navbarRef}
      >
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <span>
              <img src={NavbarLogo} alt="logo" />
            </span>
          </NavLink>
          <ul className="navbar-nav ml-auto d-none d-lg-flex mr-3">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                style={{
                  color: itemDetailPath
                    ? isLightMode
                      ? "black"
                      : "white"
                    : "",
                }}
              >
                {t("header.home")}
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                data-toggle="dropdown"
                style={{
                  color: itemDetailPath
                    ? isLightMode
                      ? "black"
                      : "white"
                    : "",
                }}
              >
                {t("header.discover")}
              </NavLink>
              <div className="dropdown-menu bt-dropdown-menu">
                {data[0]?.dataUp?.map((item, i) => (
                  <NavLink key={i} className="dropdown-item" to={item.path}>
                    {t(item.title)}
                  </NavLink>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/activity"
                style={{
                  color: itemDetailPath
                    ? isLightMode
                      ? "black"
                      : "white"
                    : "",
                }}
              >
                {t("header.activity")}
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <NavLink
                className="nav-link"
                to="/createitem"
                data-toggle="dropdown"
                style={{
                  color: itemDetailPath
                    ? isLightMode
                      ? "black"
                      : "white"
                    : "",
                }}
              >
                {t("header.createItem")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                style={{
                  color: itemDetailPath
                    ? isLightMode
                      ? "black"
                      : "white"
                    : "",
                }}
              >
                {t("header.contact")}
              </NavLink>
            </li>
          </ul>
          <div className="menu-actions">
            {isAuthenticated ? (
              <NavLink to={isAuthenticated ? "/my-profile" : "/connectwallet"}>
                <img src={userInfo.avatar} alt="" width="40px" height="40px" />
              </NavLink>
            ) : (
              <NavLink
                to={isAuthenticated ? "/my-profile" : "/connectwallet"}
                className="btn login-btn connect-wallet-button"
                style={{
                  color: itemDetailPath
                    ? isLightMode
                      ? "black"
                      : "white"
                    : "",
                }}
              >
                {t("header.connectWallet")}
              </NavLink>
            )}

            <div
              className="menu-button nav-responsive d-block d-lg-none"
              onClick={toggleMenu}
            >
              <i className="fa fa-bars"></i>
            </div>
          </div>
          <div className="d-none d-lg-block">
            <LanguageSwitcher />
          </div>

          <div className="d-none d-lg-block ml-3">
            <ModeSwitcher />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Head;
