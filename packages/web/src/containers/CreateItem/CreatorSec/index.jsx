import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";
import useThemeMode from "../../../hooks/useThemeMode";

const CreatorSec = ({
  updateFormInput,
  formInput,
  createMarket,
  onFileChange,
  fileUrl,
  fileLoading,
  buttonLoading,
  currentMarketplaceType,
  setMarketplaceType,
  onCreateMockMarketItem,
  error,
}) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <div
        className={
          isLightMode
            ? "creator-sec l-bg bt-border-radius"
            : "creator-sec dd-bg"
        }
      >
        <div className="who-we-contant">
          <div className="dream-dots text-left">
            <span className="gradient-text " onClick={onCreateMockMarketItem}>
              {t("header.createItem")}
            </span>
          </div>
        </div>
        <ContactForm
          updateFormInput={updateFormInput}
          formInput={formInput}
          createMarket={createMarket}
          onFileChange={onFileChange}
          fileUrl={fileUrl}
          fileLoading={fileLoading}
          buttonLoading={buttonLoading}
          currentMarketplaceType={currentMarketplaceType}
          setMarketplaceType={setMarketplaceType}
          error={error}
        />
      </div>
    </>
  );
};

export default CreatorSec;
