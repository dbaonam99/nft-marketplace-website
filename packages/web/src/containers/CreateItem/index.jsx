import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import Breadcumb from "../../components/Breadcumb";
import CollectionItem from "./CollectionItem";
import CreatorSec from "./CreatorSec";

import NFT from "../../contracts/NFT.abi";
import Market from "../../contracts/NFTMarket.abi";

import "../../assets/css/createItem.css";
import NFTMarketAddress from "../../contracts/NFTMarket.address";
import NFTAddress from "../../contracts/NFT.address";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const CreateItemContainer = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

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
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* next, create the item */
    let contract = new ethers.Contract(NFTAddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let tokenId = tx.events[0].args[2].toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");
    console.log("Item created!");

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(NFTMarketAddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    transaction = await contract.createMarketItem(NFTAddress, tokenId, price, {
      value: listingPrice,
    });
    console.log("Market Item created!");
    await transaction.wait();
  }

  return (
    <>
      <Breadcumb namePage="Create New Item" title="Create New Item" />
      <section className="blog-area section-padding-100">
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
