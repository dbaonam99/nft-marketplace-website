/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import { Link, useHistory } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { useGetCreatedNFTsQuery } from "../../queries/NFT.js";
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
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";

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

const ProfileContainer = () => {
  const isLightMode = useThemeMode();
  const history = useHistory();
  const { isInitialized, isAuthenticated, user, setUserData, refetchUserData } =
    useMoralis();
  const { saveFile, isUploading } = useMoralisFile();

  const { data: createdNFTs, isLoading: createdNFTsLoading } =
    useGetCreatedItemsQuery(user?.get("ethAddress"));
  const { data: myNFTs, isLoading: myNFTsLoading } = useGetOwnedItemsQuery(
    user?.get("ethAddress")
  );
  const { data: onSaleNFTs, isLoading: onSaleNFTsLoading } =
    useGetOnSaleItemsQuery(user?.get("ethAddress"));

  const [copy, setCopy] = useState(false);
  const [tab, setTab] = useState(TABS[0].id);
  const inputFile = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    const checkUser = () =>
      !isAuthenticated ? history.push("/connectwallet") : null;
    isInitialized && checkUser();
  }, [isInitialized, isAuthenticated]);

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    }
  }, [copy]);

  const handleChangeFile = async (e) => {
    try {
      if (e.target.files[0]) {
        const cover = await saveFile("cover", e.target.files[0]);
        setUserData({
          cover: cover._url,
        });
        toast.success(t("message.updatedCover"))
        refetchUserData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openFileUpload = () => {
    inputFile.current.click();
  };

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
            <NftCard {...item} key={index} seller={user?.get("ethAddress")} />
          ))
        )}
      </>
    );
  };

  return (
    <>
      <Breadcrumb namePage="Trang cá nhân" title="Trang cá nhân" />
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
                    user?.get("cover") ||
                    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  }
                  alt=""
                />
                {isUploading && (
                  <div className="profile-banner-img-loading">
                    <LoadingIndicator />
                  </div>
                )}
                <div className="edit-banner-btn" onClick={openFileUpload}>
                  Edit Cover
                </div>
                <input
                  ref={inputFile}
                  type="file"
                  name="uploadCover"
                  id="upload-cover-btn"
                  onChange={handleChangeFile}
                />
              </div>
              <div className="profile-avatar">
                <img
                  src={
                    user?.get("avatar") ||
                    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  }
                  alt=""
                />
                <Link to="/setting">
                  <div className="edit-profile-btn">Edit</div>
                </Link>
              </div>
            </div>
            <div className="profile-info mt-2">
              <div
                className={
                  isLightMode ? "profile-name text-dark" : "profile-name w-text"
                }
              >
                {user?.get("username")}{" "}
                {user?.get("email") ? `(${user?.get("email")})` : ""}
              </div>
              <CopyToClipboard
                text={user?.get("ethAddress")}
                onCopy={() => setCopy(true)}
              >
                <div
                  className={
                    isLightMode
                      ? "profile-address l-bg text-dark"
                      : "profile-address dd-bg text-white-50"
                  }
                >
                  {copy
                    ? "Copied!"
                    : createShortAddress(user?.get("ethAddress"))}
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

export default ProfileContainer;
