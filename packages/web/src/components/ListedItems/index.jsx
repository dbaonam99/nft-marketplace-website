import { NavLink } from "react-router-dom";

import InfoComponent from "../InfoComponent";
import ListedItemsItem from "../ListedItemsItem";
import { ListedItemsData } from "../../data/data-components/data-ListedItems.js";
// import ListedItemsData from './data.json'

import "./listedItems.css";

function ListedItemsContainer() {
  // console.log(ListedItemsData , ListedItemsData[0].imgSm)

  return (
    <section className="features section-padding-0-100 ">
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
