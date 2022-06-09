import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const TestPopup = () => {
  const { t } = useTranslation();

  return (
    <>
      <div id="test-popup" className="white-popup mfp-hide">
        <div className="top-form-header">
          <h4>{t("common.placeBid")}</h4>
        </div>
        <form action="#" method="post" id="main_login_form" noValidate="">
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="group">
                <input type="text" name="name" id="name0" required="" />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>{t("common.yourBidAmount")}</label>
              </div>
              <p className="g-text">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptas maxime quo magnam, rerum odio quia asperiores,
                voluptatum impedit sit, amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="col-12 col-sm-5 text-left ">
              <NavLink to="/connectwallet" className="btn more-btn">
                {t("common.placeBid")}
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TestPopup;
