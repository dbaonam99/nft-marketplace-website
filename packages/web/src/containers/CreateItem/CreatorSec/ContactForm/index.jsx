import React, { useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import useThemeMode from "../../../../hooks/useThemeMode";
import "./index.css";

const MARKET_TYPES = [
  {
    id: "fixed_price",
    name: "Fixed price",
    icon: <i className="fa fa-tag" />,
    iconDark: <i className="fa fa-tag" style={{ color: "white" }} />,
  },
  {
    id: "open_for_bids",
    name: "Open for bids",
    icon: <i className="fa fa-archive" />,
    iconDark: <i className="fa fa-archive" style={{ color: "white" }} />,
  },
  {
    id: "timed_auction",
    name: "Timed auction",
    icon: <i className="fa fa-clock-o" />,
    iconDark: <i className="fa fa-clock-o" style={{ color: "white" }} />,
  },
];

const ContactForm = (props) => {
  const {
    updateFormInput,
    formInput,
    createMarket,
    onFileChange,
    fileUrl,
    fileLoading,
    buttonLoading,
  } = props;

  const inputFile = useRef();
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  const [currentMarketplaceType, setMarketplaceType] = useState(
    MARKET_TYPES[0].id
  );
  const [currentDurationType, setCurrentDurationType] = useState("hour");

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
            <p className={isLightMode ? "text-dark" : "w-text"}>
              {t("common.uploadItemFile")}
            </p>
            <div
              className={
                isLightMode ? "bt-border-color group-file" : "group-file"
              }
            >
              <p className={isLightMode ? "text-dark" : "g-text"}>
                PNG, GIF, WEBP, MP4 or MP3. Max 100mb
              </p>
              <div
                className={clsx(
                  "new_Btn more-btn d-inline-flex align-items-center justify-content-center",
                  fileLoading && "bt-disabled-button"
                )}
                onClick={openFileUpload}
              >
                {!fileLoading ? t("common.uploadFile") : <LoadingIndicator />}
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
                onChange={(e) => updateFormInput("name", e.target.value)}
              />
              <span className="highlight"></span>
              <span className={isLightMode ? "bar-light" : "bar"}></span>
              <label className={isLightMode ? "text-dark" : ""}>
                {t("common.itemName")}
              </label>
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
                onChange={(e) => updateFormInput("description", e.target.value)}
              ></textarea>
              <span className="highlight"></span>
              <span className={isLightMode ? "bar-light" : "bar"}></span>
              <label className={isLightMode ? "text-dark" : ""}>
                {t("common.itemDescription")}
              </label>
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="group">
              <div className="marketplace-types">
                {MARKET_TYPES?.map((item) => (
                  <div
                    className={
                      currentMarketplaceType === item.id
                        ? isLightMode
                          ? "marketplace-type marketplace-type-active"
                          : "marketplace-type-dark marketplace-type-active-dark"
                        : isLightMode
                        ? "marketplace-type"
                        : "marketplace-type-dark"
                    }
                    onClick={() => setMarketplaceType(item.id)}
                    key={item.id}
                  >
                    {isLightMode ? item.icon : item.iconDark}
                    <div
                      className={
                        isLightMode
                          ? "marketplace-name"
                          : "marketplace-name-dark"
                      }
                    >
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {currentMarketplaceType === "fixed_price" && (
            <div className="col-12 col-md-12">
              <div className="group">
                <input
                  className={
                    isLightMode ? "text-dark bt-border-color-muted" : ""
                  }
                  type="text"
                  name="price"
                  id="price"
                  required
                  value={formInput.price}
                  onChange={(e) => updateFormInput("price", e.target.value)}
                />
                <span className="highlight"></span>
                <span className={isLightMode ? "bar-light" : "bar"}></span>
                <label className={isLightMode ? "text-dark" : ""}>
                  {t("common.itemPrice")}
                </label>
              </div>
            </div>
          )}
          {currentMarketplaceType === "timed_auction" && (
            <>
              <div className="col-12 col-md-12">
                <div className="group">
                  <input
                    className={
                      isLightMode ? "text-dark bt-border-color-muted" : ""
                    }
                    type="text"
                    name="price"
                    id="price"
                    required
                    value={formInput.price}
                    onChange={(e) => updateFormInput("price", e.target.value)}
                  />
                  <span className="highlight"></span>
                  <span className={isLightMode ? "bar-light" : "bar"}></span>
                  <label className={isLightMode ? "text-dark" : ""}>
                    {t("common.itemStartPrice")}
                  </label>
                </div>
              </div>

              <div className="col-12 col-md-12">
                <div className="group">
                  <input
                    className={
                      isLightMode ? "text-dark bt-border-color-muted" : ""
                    }
                    type="text"
                    name="duration"
                    id="duration"
                    required
                    value={formInput.duration}
                    onChange={(e) => {
                      console.log(e.target.value);
                      updateFormInput("duration", e.target.value);
                      updateFormInput("durationType", currentDurationType);
                    }}
                  />
                  <span className="highlight"></span>
                  <span className={isLightMode ? "bar-light" : "bar"}></span>
                  <label className={isLightMode ? "text-dark" : ""}>
                    {t("common.itemDuration")}
                  </label>
                  <div className="duration-types">
                    <div
                      onClick={() => setCurrentDurationType("minute")}
                      className={
                        currentDurationType === "minute"
                          ? isLightMode
                            ? "duration-type duration-type-active"
                            : "duration-type-dark duration-type-active-dark"
                          : isLightMode
                          ? "duration-type"
                          : "duration-type-dark"
                      }
                    >
                      Minute
                    </div>
                    <div
                      onClick={() => setCurrentDurationType("hour")}
                      className={
                        currentDurationType === "hour"
                          ? isLightMode
                            ? "duration-type duration-type-active"
                            : "duration-type-dark duration-type-active-dark"
                          : isLightMode
                          ? "duration-type"
                          : "duration-type-dark"
                      }
                    >
                      Hour
                    </div>
                    <div
                      onClick={() => setCurrentDurationType("day")}
                      className={
                        currentDurationType === "day"
                          ? isLightMode
                            ? "duration-type duration-type-active"
                            : "duration-type-dark duration-type-active-dark"
                          : isLightMode
                          ? "duration-type"
                          : "duration-type-dark"
                      }
                    >
                      Day
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-12">
                <div className="group">
                  <input
                    className={
                      isLightMode ? "text-dark bt-border-color-muted" : ""
                    }
                    type="text"
                    name="biddingStep"
                    id="biddingStep"
                    required
                    value={formInput.biddingStep}
                    onChange={(e) =>
                      updateFormInput("biddingStep", e.target.value)
                    }
                  />
                  <span className="highlight"></span>
                  <span className={isLightMode ? "bar-light" : "bar"}></span>
                  <label className={isLightMode ? "text-dark" : ""}>
                    {t("common.itemBiddingStep")}
                  </label>
                </div>
              </div>
            </>
          )}
          <div className="col-12 text-center">
            <button
              type="submit"
              className="more-btn mb-15"
              onClick={() => createMarket(currentMarketplaceType)}
            >
              {buttonLoading ? <LoadingIndicator /> : t("header.createItem")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
