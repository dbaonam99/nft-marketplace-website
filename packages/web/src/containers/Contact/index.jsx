import Breadcrumb from "../../components/Breadcrumb";
import InfoComponent from "../../components/InfoComponent";
import ContactForm from "./ContactForm";
import "../../assets/css/contact.css";
import useThemeMode from "../../hooks/useThemeMode";

const ContactContainer = () => {
  const isLightMode = useThemeMode();

  return (
    <>
      <Breadcrumb namePage="Contact Us" title="Contact Us" animNone={false} />
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
                titleSm="Get in Touch"
                titleLg="Contact With Us"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo."
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
