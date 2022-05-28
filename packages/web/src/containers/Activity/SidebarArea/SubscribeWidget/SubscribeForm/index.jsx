import { useTranslation } from "react-i18next";
import useThemeMode from "../../../../../hooks/useThemeMode";

const SubscribeForm = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <div className="subscribe-form">
          <form action="#">
              <input className={isLightMode ? "bt-border text-dark" : ""} type="email" name="email" id="subs_email" placeholder={t("footer.yourEmail")} />
              <button type="submit" className="btn login-btn mb-0">{t("common.subscribe")}</button>
          </form>
      </div>
    </>
  );
}

export default SubscribeForm;