import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom";
import { SortingCard } from "../../utils";
import CollectionItem from "./CollectionItem";
import Breadcrumb from "../../components/Breadcrumb";
import { useGetCreatedNFTsQuery } from "../../queries/NFT.js";

import "../../assets/css/profile.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";

const ProfileContainer = () => {
  const isLightMode = useThemeMode();
  let history = useHistory();

  const { t } = useTranslation();

  const { isInitialized, isAuthenticated, user } = useMoralis();

  useEffect(() => {
    const checkUser = () =>
      !isAuthenticated ? history.push("/connectwallet") : null;
    isInitialized && checkUser();
  }, [isInitialized, isAuthenticated]);

  useEffect(() => {
    SortingCard();
  }, []);

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
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  alt=""
                />
                <div className="edit-banner-btn">Edit Cover</div>
              </div>
              <div className="profile-avatar">
                <img
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  alt=""
                />
                <div className="edit-profile-btn">Edit</div>
              </div>
            </div>
            <div className="profile-info">
              <p className="profile-name">{user?.get("username")}</p>
              <p className="profile-address">{user?.get("ethAddress")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileContainer;
