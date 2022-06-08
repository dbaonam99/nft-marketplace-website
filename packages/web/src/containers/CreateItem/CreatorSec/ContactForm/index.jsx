import React, { useRef } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import useThemeMode from "../../../../hooks/useThemeMode";

const ContactForm = ({
  updateFormInput,
  formInput,
  createMarket,
  onFileChange,
  fileUrl,
  fileLoading
}) => {
  const inputFile = useRef();
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  const openFileUpload = () => {
    inputFile.current.click();
  };

  return (
    <>
      <div className="contact_form">
        <div className="row">
          <div className="col-12">
            <div id="success_fail_info"></div>
          </div>

          <div className="col-12 col-md-12">
            <p className={isLightMode ? "text-dark" : "w-text"}>{t("common.uploadItemFile")}</p>
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
              {fileUrl && <img className="rounded mt-4" src={fileUrl} alt="" />}
              <input
                ref={inputFile}
                type="file"
                name="upload"
                id="upload-btn"
                onChange={onFileChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-12">
            <div className="group">
              <input
                className={isLightMode ? "text-dark bt-border-color-muted" : ""}
                type="text"
                name="name"
                id="name"
                required
                value={formInput.name}
                onChange={(e) =>
                  updateFormInput("name", e.target.value)
                }
              />
              <span className="highlight"></span>
              <span className={isLightMode ? "bar-light" : "bar"}></span>
              <label className={isLightMode ? "text-dark" : ""}>{t("common.itemName")}</label>
            </div>
          </div>
          <div className="col-12">
            <div className="group">
              <textarea
                className={isLightMode ? "text-dark bt-border-color-muted" : ""}
                name="Description"
                id="Description"
                required
                value={formInput.description}
                onChange={(e) =>
                  updateFormInput("description", e.target.value)
                }
              ></textarea>
              <span className="highlight"></span>
              <span className={isLightMode ? "bar-light" : "bar"}></span>
              <label className={isLightMode ? "text-dark" : ""}>{t("common.itemDescription")}</label>
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="group">
              <input
                className={isLightMode ? "text-dark bt-border-color-muted" : ""}
                type="text"
                name="price"
                id="price"
                required
                value={formInput.price}
                onChange={(e) =>
                  updateFormInput("price", e.target.value)
                }
              />
              <span className="highlight"></span>
              <span className={isLightMode ? "bar-light" : "bar"}></span>
              <label className={isLightMode ? "text-dark" : ""}>{t("common.itemPrice")}</label>
            </div>
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className="more-btn mb-15"
              onClick={createMarket}
            >
              {t("header.createItem")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
