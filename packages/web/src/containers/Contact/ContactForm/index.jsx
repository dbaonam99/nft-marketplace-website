import NameInput from "./NameInput";
import data from "./data.json";
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_dzl3hqr",
        "template_rz9wws6",
        e.target,
        "f58m7Pqet81B4wQiv"
      )
      .then(
        (result) => {
          setStatus(result.text);
          setValues({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          setStatus(error.text);
        }
      );
  };

  const onChange = (name, value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          {status &&
            (status === "OK" ? (
              <div class="alert alert-success" role="alert">
                Message sent successfully!!!
              </div>
            ) : (
              <div class="alert alert-danger" role="alert">
                Message sent failed!!!
              </div>
            ))}
          <div className="contact_form">
            <form id="main_contact_form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div id="success_fail_info"></div>
                </div>
                {data &&
                  data.map((item, i) => (
                    <NameInput
                      Class={item.Class}
                      name={item.name}
                      title={t(item.title)}
                      delay={item.delay}
                      key={i}
                      onChange={onChange}
                      value={values[item.name]}
                      type={item.type}
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
                      value={values["message"]}
                      onChange={(e) => onChange("message", e.target.value)}
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
