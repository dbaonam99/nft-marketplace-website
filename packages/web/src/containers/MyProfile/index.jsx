import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { NavLink } from "react-router-dom";
import { SortingCard } from "../../utils";
import CollectionItem from "./CollectionItem";
import Breadcrumb from "../../components/Breadcrumb";
import { useGetCreatedNFTsQuery } from "../../queries/NFT.js";

import "../../assets/css/profile.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";

const ProfileContainer = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { data, refetch } = useGetCreatedNFTsQuery();

  const { authenticate, isAuthenticated, user } = useMoralis();

  console.log("user", user?.get("ethAddress"));

  useEffect(() => {
    SortingCard();
    refetch();
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
              <p className="profile-name">name</p>
              <p className="profile-address">
                0x9e7AFA4D5599c09887D05181C87bCf762D034a23
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileContainer;
