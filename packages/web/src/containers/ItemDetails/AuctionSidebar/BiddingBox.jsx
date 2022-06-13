import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";
import useThemeMode from "../../../hooks/useThemeMode";

const BiddingBox = ({ onBid }) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  return (
    <div
      style={{
        width: "100%",
        display: " flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className={isLightMode ? "biding-end" : "biding-end"}>
        <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <p
            className={
              isLightMode ? "biding-end-title-light" : "biding-end-title"
            }
          >
            {t("common.biddingEndIn")}
          </p>
          <div className="count-down titled circled text-center flex-1">
            <Countdown
              date={Date.now() + 100000000}
              renderer={(props) => {
                if (props.completed) {
                  return <span>You are good to go!</span>;
                } else {
                  return (
                    <div className="auction-countdown">
                      <div className="auction-countdown-item">
                        <p className={isLightMode ? "text-dark" : ""}>
                          {props.days}
                        </p>
                        <p>Days</p>
                      </div>
                      <div className="auction-countdown-item">
                        <p className={isLightMode ? "text-dark" : ""}>
                          {props.hours}
                        </p>
                        <p>Hours</p>
                      </div>
                      <div className="auction-countdown-item">
                        <p className={isLightMode ? "text-dark" : ""}>
                          {props.minutes}
                        </p>
                        <p>Minutes</p>
                      </div>
                      <div className="auction-countdown-item">
                        <p className={isLightMode ? "text-dark" : ""}>
                          {props.seconds}
                        </p>
                        <p>Seconds</p>
                      </div>
                    </div>
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="open-popup-link more-btn width-100" onClick={onBid}>
        Place a bid
      </div>
    </div>
  );
};

export default BiddingBox;
