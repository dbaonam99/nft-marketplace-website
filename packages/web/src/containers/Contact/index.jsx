import Breadcrumb from "../../components/Breadcrumb"
import InfoComponent from "../../components/InfoComponent"
import ContactForm from "./ContactForm"
import "../../assets/css/contact.css"
import useThemeMode from "../../hooks/useThemeMode"
import { useTranslation } from "react-i18next"

const ContactContainer = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb
        namePage={t("header.contact")}
        title={t("header.contact")}
        animNone={false}
      />
      <section className={isLightMode ? "section-padding-100 contact_us_area bg-light" : "section-padding-100 contact_us_area"} id="contact">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <InfoComponent
                titleSm={t("contact.getInTouch")}
                titleLg={t("contact.contactWithUs")}
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default ContactContainer;
