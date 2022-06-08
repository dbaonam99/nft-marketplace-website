import WhoWeContant from "./WhoWeContant";
import ContactForm from "./ContactForm";
import useThemeMode from "../../../hooks/useThemeMode";

const CreatorSec = ({
  updateFormInput,
  formInput,
  createMarket,
  onFileChange,
  fileUrl,
  fileLoading
}) => {
  const isLightMode = useThemeMode();

  return (
    <>
      <div className={isLightMode ? "creator-sec l-bg" : "creator-sec dd-bg"}>
        <WhoWeContant />
        <ContactForm
          updateFormInput={updateFormInput}
          formInput={formInput}
          createMarket={createMarket}
          onFileChange={onFileChange}
          fileUrl={fileUrl}
          fileLoading={fileLoading}
        />
      </div>
    </>
  );
};

export default CreatorSec;
