import NameInput from "./NameInput";
import data from "./data.json";
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="contact_form">
            <form action="#" method="post" id="main_contact_form" novalidate>
              <div className="row">
                <div className="col-12">
                  <div id="success_fail_info"></div>
                </div>
                {data &&
                  data.map((item, i) => (
                    <NameInput
                      Class={item.Class}
                      name={item.name}
                      title={item.title}
                      delay={item.delay}
                      key={i}
                    />
                  ))}

                <div className="col-12">
                  <div
                    className="group"
                    data-aos-delay="600"
                    data-aos="fade-up"
                  >
                    <textarea
                      className={
                        isLightMode ? "text-dark bt-border-color-muted" : ""
                      }
                      name="message"
                      id="message"
                      required
                    ></textarea>
                    <span className="highlight"></span>
                    <span className={isLightMode ? "bar-light" : "bar"}></span>
                    <label className={isLightMode ? "text-dark" : ""}>
                      {t("common.message")}
                    </label>
                  </div>
                </div>
                <div
                  className="col-12 text-center"
                  data-aos-delay="700"
                  data-aos="fade-in"
                >
                  <button type="submit" className="more-btn">
                    {t("common.sendMessage")}
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
