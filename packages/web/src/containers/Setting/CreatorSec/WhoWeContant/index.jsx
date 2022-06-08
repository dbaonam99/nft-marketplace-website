import { useTranslation } from "react-i18next";

const WhoWeContant = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="who-we-contant">
        <div className="dream-dots text-left">
          <span className="gradient-text ">{t("header.updateProfile")}</span>
        </div>
      </div>
    </>
  );
};

export default WhoWeContant;
