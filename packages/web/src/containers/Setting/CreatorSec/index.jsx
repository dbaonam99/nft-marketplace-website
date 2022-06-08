import WhoWeContant from "./WhoWeContant";
import ContactForm from "./ContactForm";
import useThemeMode from "../../../hooks/useThemeMode";

const CreatorSec = ({
  updateFormInput,
  formInput,
  updateProfile,
  onFileChange,
  fileUrl,
  fileLoading
}) => {
  const isLightMode = useThemeMode();

  return (
    <>
      <div className={isLightMode ? "creator-sec l-bg bt-border-radius" : "creator-sec dd-bg"}>
        <WhoWeContant />
        <ContactForm
          updateFormInput={updateFormInput}
          formInput={formInput}
          updateProfile={updateProfile}
          onFileChange={onFileChange}
          fileUrl={fileUrl}
          fileLoading={fileLoading}
        />
      </div>
    </>
  );
};

export default CreatorSec;
