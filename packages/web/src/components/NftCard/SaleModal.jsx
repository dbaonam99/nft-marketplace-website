import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import useThemeMode from "../../hooks/useThemeMode";
import { useCreateNFTMarketItemMutation } from "../../queries/NFT";
import { useCreateAuctionMutation } from "../../queries/Auction";
import LoadingIndicator from "../LoadingIndicator";

const MARKET_TYPES = [
  {
    id: "fixed_price",
    name: "Fixed price",
    icon: <i className="fa fa-tag" />,
    iconDark: <i className="fa fa-tag" style={{ color: "white" }} />,
  },
  {
    id: "timed_auction",
    name: "Timed auction",
    icon: <i className="fa fa-clock-o" />,
    iconDark: <i className="fa fa-clock-o" style={{ color: "white" }} />,
  },
];

const SaleModal = ({
  modalIsOpen,
  setIsOpen,
  tokenId,
  auctionId,
  listingPrice,
  itemId,
}) => {
  const isLightMode = useThemeMode();
  const createNFTMarketItemMutation = useCreateNFTMarketItemMutation();
  const createAuctionMutation = useCreateAuctionMutation();
  const { t } = useTranslation();
  const [currentMarketplaceType, setMarketplaceType] = useState("fixed_price");
  const [currentDurationType, setCurrentDurationType] = useState("hour");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formInput, updateFormInput] = useState({
    price: "",
    durationType: "",
  });

  const onChange = (name, value) => {
    updateFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createAuction = async () => {
    const { price, duration, durationType, biddingStep } = formInput;

    if (!price || !duration || !biddingStep || !durationType) {
      setButtonLoading(false);
      return;
    }

    let durationTimestamp = 0;

    switch (durationType) {
      case "minute": {
        durationTimestamp = duration * 60;
        break;
      }
      case "hour": {
        durationTimestamp = duration * 3600;
        break;
      }
      case "day": {
        durationTimestamp = duration * 24 * 3600;
        break;
      }
      default:
        break;
    }

    console.log("durationTimestamp", durationTimestamp);

    // try {
    //   createAuctionMutation.mutate({
    //     listingPrice: listingPrice.toString(),
    //     tokenId,
    //     price,
    //     duration: durationTimestamp,
    //     biddingStep,
    //     auctionId,
    //     callback: () => {
    //       updateFormInput((prevState) => ({
    //         ...prevState,
    //         price: "",
    //         duration: "",
    //         biddingStep: "",
    //       }));
    //       setButtonLoading(false);
    //       setIsOpen(false);
    //     },
    //   });
    // } catch (error) {
    //   console.log("Error uploading file: ", error);
    //   setButtonLoading(false);
    // }
  };

  const createSale = async () => {
    const { price } = formInput;
    if (!price) {
      setButtonLoading(false);
      return;
    }

    try {
      createNFTMarketItemMutation.mutate({
        listingPrice: listingPrice.toString(),
        tokenId,
        price,
        itemId,
        callback: () => {
          updateFormInput((prevState) => ({
            ...prevState,
            price: "",
          }));
          setButtonLoading(false);
          setIsOpen(false);
        },
      });
    } catch (error) {
      setButtonLoading(false);
      console.log("Error uploading file: ", error);
    }
  };

  const onSubmit = () => {
    if (currentMarketplaceType === "fixed_price") {
      createSale();
    } else {
      createAuction();
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      setIsOpen={setIsOpen}
      customsStyle={{ padding: 30 }}
    >
      <div>
        <div className="who-we-contant">
          <div className="dream-dots text-left">
            <span className="gradient-text ">{t("common.putOnSale")}</span>
          </div>
        </div>
        <div style={{ width: "500px", marginTop: 30 }}>
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
                      isLightMode ? "marketplace-name" : "marketplace-name-dark"
                    }
                  >
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {currentMarketplaceType === "fixed_price" && (
            <div className="group">
              <input
                className={isLightMode ? "text-dark bt-border-color-muted" : ""}
                type="text"
                name="price"
                id="price"
                required
                value={formInput.price}
                onChange={(e) => onChange("price", e.target.value)}
              />
              <span className="highlight"></span>
              <span className={isLightMode ? "bar-light" : "bar"}></span>
              <label className={isLightMode ? "text-dark" : ""}>
                {t("common.itemPrice")}
              </label>
            </div>
          )}
          {currentMarketplaceType === "timed_auction" && (
            <>
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
                  onChange={(e) => onChange("price", e.target.value)}
                />
                <span className="highlight"></span>
                <span className={isLightMode ? "bar-light" : "bar"}></span>
                <label className={isLightMode ? "text-dark" : ""}>
                  {t("common.itemStartPrice")}
                </label>
              </div>
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
                    onChange("duration", e.target.value);
                    onChange("durationType", currentDurationType);
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
                  onChange={(e) => onChange("biddingStep", e.target.value)}
                />
                <span className="highlight"></span>
                <span className={isLightMode ? "bar-light" : "bar"}></span>
                <label className={isLightMode ? "text-dark" : ""}>
                  {t("common.itemBiddingStep")}
                </label>
              </div>
            </>
          )}

          <div className="text-center w-full">
            <button type="submit" className="more-btn w-100" onClick={onSubmit}>
              {buttonLoading ? <LoadingIndicator /> : t("common.submit")}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SaleModal;
