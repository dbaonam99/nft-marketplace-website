import Head from "../../layouts/Head";
import ItemDetailsContainer from "../../containers/ItemDetails";
import Footer from "../../layouts/Footer";

const ItemDetails = () => {
  return (
    <>
      <Head Title="Item Details" />
      <ItemDetailsContainer />
      <Footer />
    </>
  );
};

export default ItemDetails;
