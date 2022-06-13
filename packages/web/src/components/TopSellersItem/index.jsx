import useThemeMode from "../../hooks/useThemeMode";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../queries/User";
// import { useGetUserInfoQuery } from "../../queries/User";

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
        <img
          src={
            userInfo?.avatar ||
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          }
          width="70"
          alt=""
        />
      </div>
      <div className="author-info">
        <a href="profile.html">
          <h5 className={clsx("author-name", isLightMode && "text-dark")}>
            {userInfo?.username}
          </h5>
        </a>
        <p className={clsx("author-earn mb-0", isLightMode && "text-muted")}>
          {price} ETH
        </p>
      </div>
    </div>
  );
}

export default TopSellersItem;
