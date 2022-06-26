import { useTranslation } from "react-i18next";

const HeroContainer = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-section moving section-padding" id="home">
      <div className="moving-bg"></div>
      <div className="hero-section-content">
        <div className="container ">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 col-md-12">
              <div className="welcome-content">
                <div className="promo-section">
                  <h3 className="special-head gradient-text">
                    {t("home.bannerTitle")}
                  </h3>
                </div>
                <h1>
                  {t("home.bannerSloganFirst")}{" "}
                  <span className="gradient-text">
                    {t("home.bannerSloganLast")}
                  </span>{" "}
                </h1>
                <p className="w-text">{t("home.bannerDescription")}</p>
                <div className="dream-btn-group">
                  <button className="btn btn-explore more-btn mr-3">
                    {t("common.findMore")}
                  </button>
                  <button className="btn btn-Collect more-btn">
                    {t("common.collectNFT")}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContainer;
