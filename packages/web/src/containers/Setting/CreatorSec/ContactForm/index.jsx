import React, { useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import useThemeMode from "../../../../hooks/useThemeMode";

const ContactForm = ({
  updateFormInput,
  formInput,
  updateProfile,
  onFileChange,
  fileUrl,
  fileLoading
}) => {
  const inputFile = useRef();
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const [imgData, setImgData] = useState(null);

  const openFileUpload = () => {
    inputFile.current.click();
  };

  const handleChangeFile = (e) => {
    if (e.target.files[0]) {
      onFileChange(e.target);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <>
      <div className="contact_form">
        <div className="row">
          <div className="col-12">
            <div id="success_fail_info"></div>
          </div>

          <div className="col-12 col-md-12">
            <p className={isLightMode ? "text-dark" : "w-text"}>{t("common.avatar")}</p>
            <div className={isLightMode ? "bt-border-color group-file" : "group-file"}>
              <p className={isLightMode ? "text-dark" : "g-text"}>PNG, GIF, WEBP, MP4 or MP3. Max 100mb</p>
              <div
                className={clsx(
                  "new_Btn more-btn d-inline-flex align-items-center justify-content-center",
                  fileLoading && "bt-disabled-button"
                )}
                onClick={openFileUpload}
              >
                {!fileLoading ?
                  t("common.uploadFile") :
                  <LoadingIndicator />
                }
              </div>
              <br />
              {(imgData || fileUrl) && <img className="rounded mt-4" src={imgData || fileUrl} alt="" />}
              <input
                ref={inputFile}
                type="file"
                name="upload"
                id="upload-btn"
                onChange={handleChangeFile}
              />
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="group">
              <input
                className={isLightMode ? "text-dark bt-border-color-muted" : ""}
                type="text"
                name="username"
                id="username"
                required
                value={formInput.username}
                onChange={(e) =>
                  updateFormInput("username", e.target.value)
                }
              />
              <span className="highlight"></span>
              <span className={isLightMode ? "bar-light" : "bar"}></span>
              <label className={isLightMode ? "text-dark" : ""}>{t("common.username")}</label>
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="group">
              <input
                className={isLightMode ? "text-dark bt-border-color-muted" : ""}
                type="email"
                name="email"
                id="email"
                required
                value={formInput.email}
                onChange={(e) =>
                  updateFormInput("email", e.target.value)
                }
              />
              <span className="highlight"></span>
              <span className={isLightMode ? "bar-light" : "bar"}></span>
              <label className={isLightMode ? "text-dark" : ""}>{t("common.email")}</label>
            </div>
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className="more-btn mb-15"
              onClick={updateProfile}
            >
              {t("header.updateProfile")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
