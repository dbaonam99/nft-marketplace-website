/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "../../assets/css/profile.css";
import useThemeMode from "../../hooks/useThemeMode";
import NftCard from "../../components/NftCard";
import LoadingIndicator from "../../components/LoadingIndicator";
import clsx from "clsx";
import {
  useGetCreatedItemsQuery,
  useGetOnSaleItemsQuery,
  useGetOwnedItemsQuery,
} from "../../queries/Profile";
import { getUserInfo } from "../../queries/User";

export const createShortAddress = (string) => {
  if (string) {
    return `${string.split("").slice(0, 5).join("")}...${string
      .split("")
      .slice(-4)
      .join("")}`;
  }
  return "";
};

const TABS = [
  {
    id: "ON_SALE",
    text: "ON SALE",
  },
  {
    id: "OWNED",
    text: "OWNED",
  },
  {
    id: "CREATED",
    text: "CREATED",
  },
];

const MyProfileContainer = () => {
  const isLightMode = useThemeMode();

  const { ethAddress } = useParams();

  const { data: createdNFTs, isLoading: createdNFTsLoading } =
    useGetCreatedItemsQuery(ethAddress);
  const { data: myNFTs, isLoading: myNFTsLoading } =
    useGetOwnedItemsQuery(ethAddress);
  const { data: onSaleNFTs, isLoading: onSaleNFTsLoading } =
    useGetOnSaleItemsQuery(ethAddress);

  const [copy, setCopy] = useState(false);
  const [tab, setTab] = useState(TABS[0].id);

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  }, [copy]);

  const renderListedItem = (type) => {
    let data = [];
    let loading;
    switch (type) {
      case TABS[0].id: {
        loading = onSaleNFTsLoading;
        data = onSaleNFTs ? [...onSaleNFTs] : [];
        break;
      }
      case TABS[1].id: {
        loading = myNFTsLoading;
        data = myNFTs
          ? [...myNFTs.map((item) => ({ ...item, owned: true }))]
          : [];
        break;
      }
      case TABS[2].id: {
        loading = createdNFTsLoading;
        data = createdNFTs ? [...createdNFTs] : [];
        break;
      }
      default:
        break;
    }

    return (
      <>
        {loading ? (
          <div className="d-flex justify-content-center w-100">
            <LoadingIndicator />
          </div>
        ) : (
          data?.map((item, index) => (
            <NftCard {...item} key={index} seller={ethAddress} />
          ))
        )}
      </>
    );
  };

  const [user, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(ethAddress);
      setUserInfo(_userInfo);
    })();
  }, [ethAddress]);

  return (
    <>
      <section
        className={
          isLightMode
            ? "blog-area section-padding-100 bg-light"
            : "blog-area section-padding-100"
        }
      >
        <div className="container">
          <div className="row">
            <div className="profile-banner">
              <div className="profile-banner-img">
                <img
                  src={
                    user?.cover ||
                    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="profile-avatar">
                <img
                  src={
                    user?.avatar ||
                    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="profile-info mt-2">
              <div
                className={
                  isLightMode ? "profile-name text-dark" : "profile-name w-text"
                }
              >
                {user?.username || ""}
                {user?.email || ""}
              </div>
              <CopyToClipboard text={ethAddress} onCopy={() => setCopy(true)}>
                <div
                  className={
                    isLightMode
                      ? "profile-address l-bg text-dark"
                      : "profile-address dd-bg text-white-50"
                  }
                >
                  {copy ? "Copied!" : createShortAddress(ethAddress)}
                </div>
              </CopyToClipboard>
            </div>
          </div>
          <div className="row mt-5 d-flex justify-content-center">
            <div className="dream-projects-menu mb-50">
              <div className="text-center portfolio-menu">
                {TABS.map((item) => {
                  const isActive = item.id === tab;
                  return (
                    <button
                      key={item.id}
                      className={clsx(
                        "btn",
                        isActive && "active",
                        isLightMode && "text-dark"
                      )}
                      onClick={() => setTab(item.id)}
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="row">{renderListedItem(tab)}</div>
        </div>
      </section>
    </>
  );
};

export default MyProfileContainer;
