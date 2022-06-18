/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionItem from "./CollectionItem";
import Breadcrumb from "../../components/Breadcrumb";
import LoadingIndicator from "../../components/LoadingIndicator";
import ListedItemsItem from "./ListedItemsItem";

import "../../assets/css/profile.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import { getUserInfo } from "../../queries/User";
import {
  useGetCreatedNFTsQuery,
  useGetMyNFTsQuery,
} from "../../queries/NFT.js";
import { SortingCard } from "../../utils";

const ProfileContainer = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const { ethAddress } = useParams();
  const [user, setUserInfo] = useState(null);
  const [tab, setTab] = useState("sale");
  const {
    data: createdNFTs,
    isLoading: createdNFTsLoading,
    refetch: createdNFTsRefetch,
  } = useGetCreatedNFTsQuery(ethAddress);
  const {
    data: myNFTs,
    isLoading: myNFTsLoading,
    refetch: myNFTsRefetch,
  } = useGetMyNFTsQuery(ethAddress);

  useEffect(() => {
    SortingCard();
  }, []);

  useEffect(() => {
    (async () => {
      const _userInfo = await getUserInfo(ethAddress);
      setUserInfo(_userInfo);
      createdNFTsRefetch();
      myNFTsRefetch();
    })();
  }, [ethAddress]);

  return (
    <>
      <Breadcrumb
        namePage={t("header.authorProfile")}
        title={t("header.authorProfile")}
      />
      <section
        className={
          isLightMode
            ? "blog-area section-padding-100 bg-light"
            : "blog-area section-padding-100"
        }
      >
        <div className="container">
          <div className="row">
            <CollectionItem user={user} />

            <div className="col-12 col-md-9">
              <div className="row d-flex justify-content-center">
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
              <div className="row">
                {(tab === "owned" ? myNFTsLoading : createdNFTsLoading) ? (
                  <div className="d-flex justify-content-center w-100">
                    <LoadingIndicator />
                  </div>
                ) : (
                  (tab === "owned" ? myNFTs : createdNFTs)?.map((item) => (
                    <ListedItemsItem
                      key={item.tokenId}
                      tokenId={item.tokenId}
                      imgBig={item.image}
                      imgSm={item.image}
                      title={item.name}
                      price={item.price}
                      bid={item.bid}
                      seller={ethAddress}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileContainer;
