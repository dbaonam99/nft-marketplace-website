import React from "react";
import clsx from "clsx";
import useThemeMode from "../../hooks/useThemeMode";

function InfoComponent({titleSm , titleLg , text}){
  const isLightMode = useThemeMode();

  return(
    <div className="section-heading text-center">
        <div className="dream-dots justify-content-center" data-aos="fade-up" data-aos-delay='200'>
            <span>{titleSm}</span>
        </div>
        <h2 data-aos="fade-up" data-aos-delay='300'>
          <span className={clsx(isLightMode && "text-dark")}>
            {titleLg}
          </span>
        </h2>
        <p data-aos="fade-up" data-aos-delay='400'>
          <span className={isLightMode ? "text-muted" : ""}>{text}</span>
        </p>
    </div>
  )
}

export default InfoComponent