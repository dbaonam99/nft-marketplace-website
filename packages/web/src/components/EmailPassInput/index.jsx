import { useTranslation } from "react-i18next";
import useThemeMode from "../../hooks/useThemeMode";

const EmailPassInput = ({delay1 , delay2}) => {
    const isLightMode = useThemeMode();
	const { t } = useTranslation();

  return (
  	<>
      <div className="col-12 col-md-12">
          <div className="group" data-aos-delay={delay1} data-aos="fade-up">
              <input className={isLightMode ? "text-dark bt-border-color-muted" : ""} type="text" name="email" id="email" required />
              <span className="highlight"></span>
              <span className={isLightMode ? "bar-light" : "bar"}></span>
              <label className={isLightMode ? "text-dark" : ""}>{t("common.email")}</label>
          </div>
      </div>
      <div className="col-12">
          <div className="group" data-aos-delay={delay2} data-aos="fade-up">
              <input className={isLightMode ? "text-dark bt-border-color-muted" : ""} type="password" name="password" id="password" required />
              <span className="highlight"></span>
              <span className={isLightMode ? "bar-light" : "bar"}></span>
              <label className={isLightMode ? "text-dark" : ""}>{t("common.password")}</label>
          </div>
      </div>
    </>
  );
}

export default EmailPassInput;

