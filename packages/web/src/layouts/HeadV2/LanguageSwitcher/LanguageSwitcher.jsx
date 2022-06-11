import React from "react";
import clsx from "clsx";
import "./index.css";
import { useTranslation } from "react-i18next";
import useThemeMode from "../../../hooks/useThemeMode";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isLightMode = useThemeMode();

  const handleChangeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <>
      <div className="language-switcher d-block d-lg-none">
        <div className={clsx("language-list")}>
          <div
            onClick={() => handleChangeLanguage("vi")}
            className={clsx(
              "language-item",
              i18n.language === "vi" && "disabled",
              isLightMode && "text-dark"
            )}
          >
            Tiếng Việt
          </div>
          <div
            onClick={() => handleChangeLanguage("en")}
            className={clsx(
              "language-item",
              i18n.language === "en" && "disabled",
              isLightMode && "text-dark"
            )}
          >
            English
          </div>
        </div>
      </div>
      <div className="language-switcher-mobile d-none d-lg-block ml-3">
        <div className={clsx("language-list")}>
          <div
            onClick={() => handleChangeLanguage("vi")}
            className={clsx(
              "language-item mr-3",
              i18n.language === "en" && "disabled",
              isLightMode && "text-dark"
            )}
          >
            VI
          </div>
          <div
            onClick={() => handleChangeLanguage("en")}
            className={clsx(
              "language-item",
              i18n.language === "vi" && "disabled",
              isLightMode && "text-dark"
            )}
          >
            EN
          </div>
        </div>
      </div>
    </>
  );
}
