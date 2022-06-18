import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import CreatorSec from "./CreatorSec";
import clsx from "clsx";

import "../../assets/css/createItem.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { useMoralis, useMoralisFile } from "react-moralis";
import { useHistory } from "react-router-dom";

const CreateItemContainer = () => {
  const history = useHistory();
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    username: "",
    email: "",
  });

  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { user, setUserData } = useMoralis();
  const { saveFile } = useMoralisFile();

  useEffect(() => {
    if (user) {
      updateFormInput((prev) => ({
        ...prev,
        username: user.get("username"),
        email: user.get("email"),
      }));
      setFileUrl(user.get("avatar"));
    }
  }, [user]);

  async function onFileChange(file) {
    setFileUrl(file);
  }

  const onChange = (name, value) => {
    updateFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateProfile = async () => {
    if (!formInput.username && !formInput.email && !fileUrl) return;
    if (fileUrl?.files?.length > 0) {
      const avatar = await saveFile("avatar", fileUrl?.files?.[0]);
      setUserData({
        avatar: avatar._url,
        username: formInput.username,
        email: formInput.email,
      });
    } else {
      setUserData({
        username: formInput.username,
        email: formInput.email,
      });
    }
    history.push("/my-profile");
  };

  return (
    <>
      <Breadcrumb
        namePage={t("header.updateProfile")}
        title={t("header.updateProfile")}
      />
      <section
        className={clsx(
          "blog-area section-padding-100",
          isLightMode && "bg-light"
        )}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-8">
              <CreatorSec
                updateFormInput={onChange}
                formInput={formInput}
                updateProfile={updateProfile}
                onFileChange={onFileChange}
                fileUrl={fileUrl}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateItemContainer;
