import Breadcrumb from "../../components/Breadcrumb";
import InfoComponent from "../../components/InfoComponent";
import ContactForm from "./ContactForm";
import useThemeMode from "../../hooks/useThemeMode";

const SignUpContainer = () => {
  const isLightMode = useThemeMode();

  return (
    <>
      <Breadcrumb namePage="Signup" title="Signup" animNone={false} />
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
                titleSm="Signup Now!"
                titleLg="Create New Account"
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

export default SignUpContainer;
