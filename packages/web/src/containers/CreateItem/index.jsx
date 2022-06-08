import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Breadcrumb from "../../components/Breadcrumb";
import CollectionItem from "./CollectionItem";
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
import { toast } from "react-toastify";
import PreviewItem from "./PreviewItem";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const CreateItemContainer = () => {
  const { data: listingPrice } = useGetListingPriceQuery();

  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const [fileLoading, setFileLoading] = useState(false);

  const createNFTMutation = useCreateNFTMutation();
  const createNFTMarketItemMutation = useCreateNFTMarketItemMutation();
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  async function onFileChange(e) {
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
  }

  async function createMarket() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
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

      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setFileLoading(false);
    }
  }

  async function createSale(url) {
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    createNFTMutation.mutate(
      { url },
      {
        onSuccess: (res) => {
          createNFTMarketItemMutation.mutate({
            listingPrice: listingPrice.toString(),
            tokenId: res,
            price,
            callback: () => {
              updateFormInput(prevState => ({
                ...prevState,
                price: "",
                name: "",
                description: "",
              }))
              setFileUrl(null);
            }
          });
        },
      }
    );
  }

  const onChange = (name, value) => {
    updateFormInput(prevState => ({
      ...prevState,
      [name]: value
    }))
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
              <CreatorSec
                updateFormInput={onChange}
                formInput={formInput}
                createMarket={createMarket}
                onFileChange={onFileChange}
                fileUrl={fileUrl}
                fileLoading={fileLoading}
              />
            </div>
            <div className="d-none d-lg-block col-lg-4">
              <PreviewItem
                image={fileUrl}
                name={formInput.name}
                price={formInput.price}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateItemContainer;
