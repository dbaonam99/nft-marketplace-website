import { useTranslation } from "react-i18next"
import Breadcrumb from "../../components/Breadcrumb"
import InfoComponent from "../../components/InfoComponent"
import useThemeMode from "../../hooks/useThemeMode"
import ContactForm from "./ContactForm"

const LoginContainer = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb
        namePage={t("common.login")}
        title={t("common.login")}
        animNone={false}
      />
      <section
        className={
          isLightMode
            ? "section-padding-100 contact_us_area bg-light"
            : "section-padding-100 contact_us_area"
        }
        id="contact"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <InfoComponent
                titleSm={t("login.loginNow")}
                titleLg={t("login.loginToAccount")}
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default LoginContainer;
