import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import Breadcumb from "../../components/Breadcumb";
import CollectionItem from "./CollectionItem";
import CreatorSec from "./CreatorSec";
import {
  useCreateNFTMarketItemMutation,
  useCreateNFTMutation,
  useGetListingPriceQuery,
} from "../../queries/NFT";
import clsx from "clsx";

import NFT from "../../contracts/NFT.abi";

// import Market from "../../contracts/NFTMarket.abi";

import "../../assets/css/createItem.css";
import useThemeMode from "../../hooks/useThemeMode";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const CreateItemContainer = () => {
  const { data: listingPrice, refetch } = useGetListingPriceQuery();

  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  const createNFTMutation = useCreateNFTMutation();
  const createNFTMarketItemMutation = useCreateNFTMarketItemMutation();
  const isLightMode = useThemeMode();

  async function onFileChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
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
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */

      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    createNFTMutation.mutate(
      { url },
      {
        onSuccess: (res) => {
          createNFTMarketItemMutation.mutate(
            { listingPrice: listingPrice.toString(), tokenId: res, price },
            {
              onSuccess: (res) => {
                console.log(res);
              },
            }
          );
        },
      }
    );
  }

  return (
    <>
      <Breadcumb namePage="Create New Item" title="Create New Item" />
      <section 
        className={
          clsx(
            "blog-area section-padding-100",
            isLightMode && "bg-light"
          )
        }
      >
        <div className="container">
          <div className="row">
            <CollectionItem />

            <div className="col-12 col-lg-8">
              <CreatorSec
                updateFormInput={updateFormInput}
                formInput={formInput}
                createMarket={createMarket}
                onFileChange={onFileChange}
                fileUrl={fileUrl}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateItemContainer;
