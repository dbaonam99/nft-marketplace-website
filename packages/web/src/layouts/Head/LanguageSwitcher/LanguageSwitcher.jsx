import React, { useState } from 'react'
import clsx from "clsx";
import "./index.css";
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const [active, setActive] = useState(false);
  const { i18n } = useTranslation();
  
  const toggleDropdown = () => {
    setActive(!active);
  }

  const handleChangeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setActive(false);
  }

  return (
    <div className="language-switcher">
      <div className="current-language" onClick={toggleDropdown}>
        Tiếng Việt
      </div>
      <div className={clsx("language-list", active && "active")}>
        <div 
          onClick={() => handleChangeLanguage("vi")} 
          className={clsx("language-item", i18n.language === "vi" && "disabled")}
        >
          Tiếng Việt
        </div>
        <div 
          onClick={() => handleChangeLanguage("en")} 
          className={clsx("language-item", i18n.language === "en" && "disabled")}
        >
          Englist
        </div>
      </div>
    </div>
  )
}
