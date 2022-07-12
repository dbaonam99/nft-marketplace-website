/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import useThemeMode from "../../../../hooks/useThemeMode";
import { useGetAuctionDetailQuery } from "../../../../queries/Auction";
import { useGetNFTDetailQuery } from "../../../../queries/NFT";
import axios from "axios";
import { ethers } from "ethers";
import { NFT_ADDRESS } from "../../../../contracts/NFT.address";
import NFT_ABI from "../../../../contracts/contracts/NFT.sol/NFT.json";
import { useState } from "react";

const isAuction = (actionType) => {
  if (["startAuction", "endAuction", "bid"].includes(actionType)) return true;
  return false;
};

function ItemTimeline({ date, time, actionType, tokenId }) {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  const [tokenData, setTokenData] = useState();
  let data;
  let isLoading;

  console.log(data);

  useEffect(() => {
    const getDataByTokenId = async (tokenId) => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "http://localhost:8545"
        );
        const tokenContract = new ethers.Contract(
          NFT_ADDRESS,
          NFT_ABI,
          provider
        );
        const tokenUri = await tokenContract.tokenURI(tokenId);
        const meta = await axios.get(tokenUri);
        setTokenData(meta.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (actionType === "createToken") {
      getDataByTokenId(tokenId);
    }
  }, [actionType, tokenId]);

  const { data: nftDetail, isLoading: nftDetailLoading } = useGetNFTDetailQuery(
    actionType === "createToken" ? "" : !isAuction(actionType) ? tokenId : ""
  );

  const { data: auctionDetail, isLoading: auctionDetailLoading } =
    useGetAuctionDetailQuery(
      actionType === "createToken" ? "" : isAuction(actionType) ? tokenId : ""
    );

  if (actionType !== "createToken") {
    data = isAuction(actionType) ? auctionDetail : nftDetail;
    console.log(auctionDetail, nftDetail);
    isLoading = isAuction(actionType) ? auctionDetailLoading : nftDetailLoading;
  } else {
    data = tokenData;
  }

  const title = useMemo(() => {
    switch (actionType) {
      case "createToken":
        return `${t("activity.createdToken")} "${data?.name}"`;
      case "createMarket":
        return `${t("activity.saledToken")} "${data?.name}"`;
      case "buyToken":
        return `${t("activity.buyToken")} "${data?.name}"`;
      case "sellToken":
        return `${t("activity.sellToken")} "${data?.name}"`;
      case "startAuction": {
        console.log(tokenId, data);
        return `${t("activity.startAuction")} "${data?.name}"`;
      }
      case "bid": {
        console.log(data);
        return `${t("activity.bid")} "${data?.name}"`;
      }
      default:
        break;
    }
  }, [data, t, tokenId, actionType, tokenId]);

  const description = useMemo(() => {
    switch (actionType) {
      case "createToken":
        return `${t("activity.createdToken")} "${data?.name}"`;
      case "createMarket":
        return (
          <>
            {t("activity.saledToken")}{" "}
            <NavLink to={`/item-details/${tokenId}`}>{data?.name}</NavLink>{" "}
            {
              <>
                {t("common.for")}{" "}
                <span className={isLightMode ? "text-dark" : "w-text"}>
                  {data?.price} UIT
                </span>
              </>
            }
          </>
        );
      case "buyToken":
        return (
          <>
            {t("activity.buyToken")}{" "}
            <NavLink to={`/item-details/${tokenId}`}>{data?.name}</NavLink>{" "}
            {
              <>
                {t("common.for")}{" "}
                <span className={isLightMode ? "text-dark" : "w-text"}>
                  {data?.price} UIT
                </span>
              </>
            }
          </>
        );
      case "sellToken":
        return (
          <>
            {t("activity.sellToken")}{" "}
            <NavLink to={`/item-details/${tokenId}`}>{data?.name}</NavLink>{" "}
            {
              <>
                {t("common.for")}{" "}
                <span className={isLightMode ? "text-dark" : "w-text"}>
                  {data?.price} UIT
                </span>
              </>
            }
          </>
        );
      case "startAuction":
        return (
          <>
            {t("activity.startAuction")}{" "}
            <NavLink to={`/item-details/${tokenId}?auction=true`}>
              {data?.name}
            </NavLink>{" "}
            {
              <>
                {t("common.withStartPrice")}{" "}
                <span className={isLightMode ? "text-dark" : "w-text"}>
                  {data?.startingPrice} UIT
                </span>
              </>
            }
            ,{" "}
            {
              <>
                {t("common.biddingStep")}{" "}
                <span className={isLightMode ? "text-dark" : "w-text"}>
                  {data?.biddingStep} UIT
                </span>
              </>
            }
          </>
        );
      case "bid":
        return (
          <>
            {t("activity.bid")}{" "}
            <NavLink to={`/item-details/${tokenId}?auction=true`}>
              {data?.name}
            </NavLink>
          </>
        );
      default:
        break;
    }
  }, [data, t, tokenId, actionType, tokenId]);

  return (
    <>
      {isLoading ? (
        <div className="mb-3">
          <LoadingIndicator />
        </div>
      ) : (
        <li>
          <div className="timelineDot"></div>
          <div className="timelineDate">
            <p>
              <i className="fa fa-calendar mr-5p"></i>
              {date}
            </p>
            <p>
              <i className="fa fa-clock-o mr-5p"></i>
              {time}
            </p>
          </div>
          <div className="timelineWork">
            <h6 className={isLightMode ? "text-dark" : ""}>{title}</h6>
            <span className={isLightMode ? "text-muted" : ""}>
              {description}
            </span>
          </div>
        </li>
      )}
    </>
  );
}

export default ItemTimeline;
