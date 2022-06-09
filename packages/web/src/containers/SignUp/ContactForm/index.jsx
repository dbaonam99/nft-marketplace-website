import { useTranslation } from "react-i18next";
import EmailPassInput from "../../../components/EmailPassInput";
import useThemeMode from "../../../hooks/useThemeMode";

const ContactForm = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="contact_form">
            <form action="#" method="post" id="main_contact_form" noValidate>
              <div className="row">
                <div className="col-12">
                  <div id="success_fail_info"></div>
                </div>
                <div className="col-12 col-md-12">
                  <div
                    className="group"
                    data-aos-delay="300"
                    data-aos="fade-up"
                  >
                    <input
                      className={
                        isLightMode ? "text-dark bt-border-color-muted" : ""
                      }
                      type="text"
                      name="name"
                      id="name"
                      required
                    />
                    <span className="highlight"></span>
                    <span className={isLightMode ? "bar-light" : "bar"}></span>
                    <label className={isLightMode ? "text-dark" : ""}>
                      {t("common.name")}
                    </label>
                  </div>
                </div>
                <EmailPassInput delay1="300" delay2="300" />
                <div
                  className="col-12 text-center"
                  data-aos-delay="600"
                  data-aos="fade-in"
                >
                  <button type="submit" className="more-btn">
                    {t("common.signUp")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
