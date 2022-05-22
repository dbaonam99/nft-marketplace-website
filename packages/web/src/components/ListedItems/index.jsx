import { useEffect } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import InfoComponent from "../InfoComponent";
import ListedItemsItem from "../ListedItemsItem";
import { ListedItemsData } from "../../data/data-components/data-ListedItems.js";

import "./listedItems.css";

import useThemeMode from "../../hooks/useThemeMode";
import { useGetNFTsQuery } from "../../queries/NFT";

function ListedItemsContainer() {
  const isLightMode = useThemeMode();
  const { data: NFTs } = useGetNFTsQuery();

  console.log("data", NFTs);

  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(NFTMarketAddress, Market.abi, signer);
    // const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    // const transaction = await contract.createMarketSale(
    //   NFTAddress,
    //   nft.tokenId,
    //   {
    //     value: price,
    //   }
    // );
    // await transaction.wait();
    // loadNFTs();
  }

  return (
    <section
      className={clsx(
        "features section-padding-0-100 ",
        isLightMode && "bg-light"
      )}
    >
      <div className="container">
        <InfoComponent
          titleSm="Khám phá các NFT mới"
          titleLg="Danh Sách NFT mới nhất"
        />
        <div className="row align-items-center">
          {NFTs?.map((item, i) => (
            <ListedItemsItem
              imgBig={item.image}
              imgSm={item.image}
              title={item.name}
              price={item.price}
              bid={item.bid}
            />
          ))}
          {ListedItemsData?.map((item, i) => (
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
