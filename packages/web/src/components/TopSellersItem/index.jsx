/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import clsx from "clsx";
import { getUserInfo } from "../../queries/User";
import useThemeMode from "../../hooks/useThemeMode";

function TopSellersItem({ rank, user, price }) {
  const isLightMode = useThemeMode();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(user);
      setUserInfo(_userInfo);
    })();
  }, [user]);

  return (
    <div className="author-item">
      <div className="author-rank">{rank}</div>
      <div className="author-img">
        {userInfo?.avatar ? (
          <img
            src={userInfo?.avatar}
            style={{
              height: "70px",
              width: "70px",
            }}
            alt=""
          />
        ) : (
          <div
            style={{
              height: "70px",
              width: "70px",
              background: "#DDD",
              borderRadius: "50%",
            }}
          />
        )}
      </div>
      <div className="author-info">
        {userInfo?.username ? (
          <a href={`/profile/${userInfo?.ethAddress}`}>
            <h5 className={clsx("author-name", isLightMode && "text-dark")}>
              {userInfo?.username}
            </h5>
          </a>
        ) : (
          <a>
            <h5 className={clsx("author-name", isLightMode && "text-dark")}>
              ...
            </h5>
          </a>
        )}
        <p className={clsx("author-earn mb-0", isLightMode && "text-muted")}>
          {price ? `${price} UIT` : "..."}
        </p>
      </div>
    </div>
  );
}

export default TopSellersItem;
