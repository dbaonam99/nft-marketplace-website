import { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../../../components/Modal";
import useThemeMode from "../../../hooks/useThemeMode";
import { useBidMutation } from "../../../queries/Auction";

const BidModal = ({ modalIsOpen, setIsOpen, auctionId }) => {
  const isLightMode = useThemeMode();
  const bidMutation = useBidMutation();
  const { t } = useTranslation();
  const [bidPrice, setBidPrice] = useState();

  const bid = () => {
    bidMutation.mutate({
      auctionId,
      price: bidPrice,
    });
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
            <span className="gradient-text ">{t("header.createItem")}</span>
          </div>
        </div>
        <div style={{ width: 300 }}>
          <div className="group">
            <input
              className={isLightMode ? "text-dark bt-border-color-muted" : ""}
              type="text"
              name="name"
              id="name"
              required
              value={bidPrice}
              onChange={(e) => setBidPrice(e.target.value)}
            />
            <span className="highlight"></span>
            <span className={isLightMode ? "bar-light" : "bar"}></span>
            <label className={isLightMode ? "text-dark" : ""}>
              {t("common.price")}
            </label>
          </div>
          <div className="text-center w-full">
            <button type="submit" className="more-btn w-100" onClick={bid}>
              Place a bid
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BidModal;
