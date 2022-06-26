import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
// import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";
import CreatorSec from "./CreatorSec";
import {
  useCreateNFTMarketItemMutation,
  useCreateNFTMutation,
  useGetListingPriceQuery,
} from "../../queries/NFT";
import clsx from "clsx";

import "../../assets/css/createItem.css";
import useThemeMode from "../../hooks/useThemeMode";
import { useTranslation } from "react-i18next";
import PreviewItem from "./PreviewItem";
import { useCreateAuctionMutation } from "../../queries/Auction";
import toast from "react-hot-toast";
import { auctionData, marketData, useCreateMockMarketItem } from "./mockData";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const CreateItemContainer = () => {
  const { data: listingPrice } = useGetListingPriceQuery();

  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
    durationType: "",
  });
  const [fileLoading, setFileLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [currentMarketplaceType, setMarketplaceType] = useState("fixed_price");

  const createNFTMutation = useCreateNFTMutation();
  const createNFTMarketItemMutation = useCreateNFTMarketItemMutation();
  const createAuctionMutation = useCreateAuctionMutation();
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    try {
      setFileLoading(true);
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setFileLoading(false);
    }
  };

  const createMarket = async (type) => {
    setButtonLoading(true);
    switch (type) {
      case "fixed_price": {
        createSale();
        break;
      }
      case "timed_auction": {
        createAuction();
        break;
      }
      default:
        break;
    }
  };

  const createSale = async () => {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) {
      setButtonLoading(false);
      return;
    }
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      setFileLoading(true);
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */

      createNFTMutation.mutate(
        { url },
        {
          onSuccess: (res) => {
            createNFTMarketItemMutation.mutate(
              {
                listingPrice: listingPrice.toString(),
                tokenId: res,
                price,
              },
              {
                onSuccess: () => {
                  updateFormInput((prevState) => ({
                    ...prevState,
                    price: "",
                    name: "",
                    description: "",
                  }));
                  setFileUrl(null);
                  setButtonLoading(false);
                  toast.success(t("message.createdNFT"));
                },
              }
            );
          },
        }
      );
    } catch (error) {
      setButtonLoading(false);
      console.log("Error uploading file: ", error);
    } finally {
      setFileLoading(false);
    }
  };

  const onChange = (name, value) => {
    updateFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createAuction = async () => {
    const { name, description, price, duration, durationType, biddingStep } =
      formInput;

    if (
      !name ||
      !description ||
      !price ||
      !fileUrl ||
      !duration ||
      !biddingStep ||
      !durationType
    ) {
      setButtonLoading(false);
      return;
    }

    let durationTimestamp = 0;

    switch (durationType) {
      case "minute": {
        durationTimestamp = duration * 60;
        break;
      }
      case "hour": {
        durationTimestamp = duration * 3600;
        break;
      }
      case "day": {
        durationTimestamp = duration * 24 * 3600;
        break;
      }
      default:
        break;
    }

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      setFileLoading(true);
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      createNFTMutation.mutate(
        { url },
        {
          onSuccess: (res) => {
            createAuctionMutation.mutate(
              {
                listingPrice: listingPrice.toString(),
                tokenId: res,
                price,
                duration: durationTimestamp,
                biddingStep,
              },
              {
                onSuccess: () => {
                  updateFormInput((prevState) => ({
                    ...prevState,
                    price: "",
                    name: "",
                    description: "",
                    duration: "",
                    biddingStep: "",
                  }));
                  setFileUrl(null);
                  setButtonLoading(false);
                  toast.success(t("message.createdNFT"));
                },
              }
            );
          },
        }
      );
    } catch (error) {
      console.log("Error uploading file: ", error);
      setButtonLoading(false);
    } finally {
      setFileLoading(false);
    }
  };

  const createMockMarketItem = async () => {
    const callContract = async (url, price) => {
      return new Promise((resolve) => {
        createNFTMutation.mutate(
          {
            url,
          },
          {
            onSuccess: (res) => {
              createNFTMarketItemMutation.mutate(
                {
                  listingPrice: listingPrice.toString(),
                  tokenId: res,
                  price: price,
                },
                {
                  onSuccess: (res) => {
                    resolve(res);
                  },
                }
              );
            },
          }
        );
      });
    };
    for (let i in marketData) {
      await callContract(marketData[i].url, marketData[i].price);
    }
    const callAuctionContract = async (url, price, duration, biddingStep) => {
      return new Promise((resolve) => {
        createNFTMutation.mutate(
          { url },
          {
            onSuccess: (res) => {
              createAuctionMutation.mutate(
                {
                  listingPrice: listingPrice.toString(),
                  tokenId: res,
                  price,
                  duration,
                  biddingStep,
                },
                {
                  onSuccess: (res) => {
                    resolve(res);
                  },
                }
              );
            },
          }
        );
      });
    };
    for (let i in auctionData) {
      await callAuctionContract(
        auctionData[i].url,
        auctionData[i].price,
        auctionData[i].duration,
        auctionData[i].biddingStep
      );
    }
  };

  return (
    <>
      <Breadcrumb
        namePage={t("header.createItem")}
        title={t("header.createItem")}
      />
      <section
        className={clsx(
          "blog-area section-padding-100",
          isLightMode && "bg-light"
        )}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8">
              {/* <div onClick={() => createMockMarketItem()}>TEST</div> */}
              <CreatorSec
                updateFormInput={onChange}
                formInput={formInput}
                createMarket={createMarket}
                onFileChange={onFileChange}
                fileUrl={fileUrl}
                fileLoading={fileLoading}
                buttonLoading={buttonLoading}
                currentMarketplaceType={currentMarketplaceType}
                setMarketplaceType={setMarketplaceType}
              />
            </div>
            <div className="d-none d-lg-block col-lg-4">
              <PreviewItem
                image={fileUrl}
                name={formInput.name}
                price={formInput.price}
                currentMarketplaceType={currentMarketplaceType}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateItemContainer;
