import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";
import clsx from "clsx";

import { NavLink } from "react-router-dom";

import InfoComponent from "../InfoComponent";
import ListedItemsItem from "../ListedItemsItem";
import { ListedItemsData } from "../../data/data-components/data-ListedItems.js";

import "./listedItems.css";
import { useEffect, useState } from "react";

import NFTAddress from "../../contracts/NFT.address";
import NFTMarketAddress from "../../contracts/NFTMarket.address";

import NFT from "../../contracts/NFT.abi";
import Market from "../../contracts/NFTMarket.abi";
import useThemeMode from "../../hooks/useThemeMode";

function ListedItemsContainer() {
  // console.log(ListedItemsData, ListedItemsData[0].imgSm);

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState();
  const isLightMode = useThemeMode();

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com"
    );
    const tokenContract = new ethers.Contract(NFTAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      NFTMarketAddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    console.log(data);

    // const items = await Promise.all(
    //   data.map(async (i) => {
    //     const tokenUri = await tokenContract.tokenURI(i.tokenId);
    //     const meta = await axios.get(tokenUri);
    //     let price = ethers.utils.formatUnits(i.price.toString(), "ether");
    //     let item = {
    //       price,
    //       tokenId: i.tokenId.toNumber(),
    //       seller: i.seller,
    //       owner: i.owner,
    //       image: meta.data.image,
    //       name: meta.data.name,
    //       description: meta.data.description,
    //     };
    //     return item;
    //   })
    // );
    // setNfts(items);
    // setLoading(true);
  }

  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(NFTMarketAddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      NFTAddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  }

  return (
    <section 
      className={
        clsx(
          "features section-padding-0-100 ",
          isLightMode && "bg-light"
        )
      }
    >
      <div className="container">
        <InfoComponent
          titleSm="Khám phá các NFT mới"
          titleLg="Danh Sách NFT mới nhất"
        />
        <div className="row align-items-center">
          {ListedItemsData &&
            ListedItemsData.map((item, i) => (
              <ListedItemsItem
                imgBig={item.imgBig}
                imgSm={item.imgSm}
                title={item.title}
                price={item.price}
                bid={item.bid}
              />
            ))}
          <div className="col-12 col-lg-12 text-center">
            <NavLink className="btn more-btn" to="/discover">
              Xem Thêm
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListedItemsContainer;
