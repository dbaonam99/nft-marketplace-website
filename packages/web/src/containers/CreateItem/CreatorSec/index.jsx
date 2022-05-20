import WhoWeContant from "./WhoWeContant";
import ContactForm from "./ContactForm";
import useThemeMode from "../../../hooks/useThemeMode";

const CreatorSec = ({
  updateFormInput,
  formInput,
  createMarket,
  onFileChange,
  fileUrl,
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
        />
      </div>
    </>
  );
};

export default CreatorSec;
