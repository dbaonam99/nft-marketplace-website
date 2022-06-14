import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";
import useThemeMode from "../../../hooks/useThemeMode";
import { getUserInfo } from "../../../queries/User";

const BiddingBox = ({
  onBid,
  highestBidAmount,
  highestBidder,
  duration,
  startTime,
}) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(highestBidder);
      setUserInfo(_userInfo);
    })();
  }, [highestBidder]);

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
        <div className="sides">
          <p
            className={
              isLightMode ? "biding-end-title-light" : "biding-end-title"
            }
          >
            {t("common.highestBid")}:
          </p>
          <div className="count-down titled circled text-center flex-1">
            <div className="auction-countdown">
              <div className="auction-countdown-item">
                <p className={isLightMode ? "text-dark" : ""}>
                  {highestBidAmount} UIT
                </p>
                <p>{userInfo?.username}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sides">
          <p
            className={
              isLightMode ? "biding-end-title-light" : "biding-end-title"
            }
          >
            {t("common.biddingEndIn")}
          </p>
          <div className="count-down titled circled text-center flex-1">
            <Countdown
              date={new Date(Number(duration) + Number(startTime))}
              renderer={(props) => {
                if (props.completed) {
                  return <span>Auction ended!</span>;
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
