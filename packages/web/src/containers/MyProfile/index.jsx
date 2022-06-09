import { useEffect, useRef, useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import { Link, useHistory } from "react-router-dom";
import { SortingCard } from "../../utils";
import CollectionItem from "./CollectionItem";
import Breadcrumb from "../../components/Breadcrumb";
import { useGetCreatedNFTsQuery, useGetMyNFTsQuery } from "../../queries/NFT.js";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import "../../assets/css/profile.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import ListedItemsItem from "../../components/ListedItemsItem";
import LoadingIndicator from "../../components/LoadingIndicator";

export const createShortAddress = (string) => {
  if (string) {
    return `${string
      .split("")
      .slice(0, 5)
      .join("")}...${string
        .split("")
        .slice(-4)
        .join("")}`
  }
  return "";
}

const ProfileContainer = () => {
  const isLightMode = useThemeMode();
  let history = useHistory();
  const { data: createdNFTs, isLoading: createdNFTsLoading } = useGetCreatedNFTsQuery();
  const { data: myNFTs, isLoading: myNFTsLoading } = useGetMyNFTsQuery();
  const { t } = useTranslation();

  const { isInitialized, isAuthenticated, user, setUserData, refetchUserData } = useMoralis();
  const { saveFile } = useMoralisFile();

  const [copy, setCopy] = useState(false);
  const [tab, setTab] = useState("sale");
  const inputFile = useRef();

  useEffect(() => {
    const checkUser = () =>
      !isAuthenticated ? history.push("/connectwallet") : null;
    isInitialized && checkUser();
  }, [isInitialized, isAuthenticated]);

  useEffect(() => {
    SortingCard();
  }, []);

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false)
      }, 2000);
    }
  }, [copy])

  const handleChangeFile = async (e) => {
    if (e.target.files[0]) {
      const cover = await saveFile("cover", e.target.files[0]);
      setUserData({
        cover: cover._url,
      })
      refetchUserData()
    }
  }

  const openFileUpload = () => {
    inputFile.current.click();
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
                  src={user?.get("cover") || "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"}
                  alt=""
                />
                <div className="edit-banner-btn" onClick={openFileUpload}>Edit Cover</div>
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
                  src={user?.get("avatar") || "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"}
                  alt=""
                />
                <Link to="/setting">
                  <div className="edit-profile-btn">Edit</div>
                </Link>
              </div>
            </div>
            <div className="profile-info mt-2">
              <div className={isLightMode ? "profile-name text-dark" : "profile-name w-text"}>
                {user?.get("username")} {user?.get("email") ? `(${user?.get("email")})` : ""}
              </div>
              <CopyToClipboard text={user?.get("ethAddress")} onCopy={() => setCopy(true)}>
                <div className={isLightMode ? "profile-address l-bg text-dark" : "profile-address dd-bg text-white-50"}>
                  {copy ?
                    "Copied!" :
                    createShortAddress(user?.get("ethAddress"))
                  }
                </div>
              </CopyToClipboard>
            </div>
          </div>
          <div className="row mt-5 d-flex justify-content-center">
            <div className="dream-projects-menu mb-50">
              <div className="text-center portfolio-menu">
                <button
                  className={
                    isLightMode ? "btn active text-dark" : "btn active"
                  }
                  data-filter="*"
                  onClick={() => setTab("sale")}
                >
                  On Sale
                </button>
                <button
                  className={isLightMode ? "btn text-dark" : "btn"}
                  data-filter=".branding"
                  onClick={() => setTab("owned")}
                >
                  Owned
                </button>
                <button
                  className={isLightMode ? "btn text-dark" : "btn"}
                  data-filter=".design"
                  onClick={() => setTab("created")}
                >
                  Created
                </button>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            {(tab === "owned" ? myNFTsLoading : createdNFTsLoading) ?
              <div className="d-flex justify-content-center w-100">
                <LoadingIndicator />
              </div> :
              (tab === "owned" ? myNFTs : createdNFTs)?.map((item) => (
                <ListedItemsItem
                  key={item.tokenId}
                  tokenId={item.tokenId}
                  imgBig={item.image}
                  imgSm={item.image}
                  title={item.name}
                  price={item.price}
                  bid={item.bid}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileContainer;
