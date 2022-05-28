import React from "react";

import "./footer.css";

import data from "../../data/data-layouts/data-Footer.json";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="main-footer text-center">
      <div className="widgets-section padding-top-small padding-bottom-small">
        <div className="container">
          <div className="row clearfix">
            <div className="footer-column col-md-4 col-sm-6 col-xs-12">
              <div className="footer-widget about-widget">
                <h3 className="has-line-center">{t("footer.aboutUs")}</h3>
                <div className="widget-content">
                  <div className="text">
                    {t("footer.aboutUsContent")}
                  </div>
                  <ul className="social-links">
                    {data[0].iconsData &&
                      data[0].iconsData.map((item, i) => (
                        <li>
                          <a href="#">
                            <span key={i} className={item.icoClass}></span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-column col-md-4 col-sm-6 col-xs-12">
              <div className="footer-widget contact-widget">
                <h3 className="has-line-center">{t("footer.contactUs")}</h3>
                <div className="widget-content">
                  <ul className="contact-info">
                    <li>
                      <div className="icon">
                        <span className="flaticon-support"></span>
                      </div>
                    </li>
                    {data[1].infoData &&
                      data[1].infoData.map((item, i) => (
                        <li key={i}>{t(item.text)}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-column col-md-4 col-sm-12 col-xs-12">
              <div className="footer-widget newsletter-widget">
                <h3 className="has-line-center">{t("footer.newsletter")}</h3>
                <div className="widget-content">
                  <div className="text">
                    {t("footer.newsletterContent")}
                  </div>
                  <div className="newsletter-form">
                    <form method="post">
                      <div className="form-group">
                        <input
                          type="email"
                          name="field-name"
                          value=""
                          placeholder={t("footer.yourEmail")}
                          required=""
                        />
                        <button type="submit" className="send-btn">
                          <span className="fa fa-paper-plane-o"></span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="auto-container">
          <div className="copyright-text">{t("footer.copyright")}</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
