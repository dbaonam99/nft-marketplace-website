import WhoWeContant from "./WhoWeContant";
import ContactForm from "./ContactForm";

const CreatorSec = ({
  updateFormInput,
  formInput,
  createMarket,
  onFileChange,
  fileUrl,
}) => {
  return (
    <>
      <div className="creator-sec dd-bg">
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
