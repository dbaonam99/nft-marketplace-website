import Head from "../../layouts/Head";
import ItemDetailsContainer from "../../containers/ItemDetails";
import Footer from "../../layouts/Footer";
import { useTranslation } from "react-i18next";

const ItemDetails = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head Title={t("header.itemDetails")} />
      <ItemDetailsContainer />
      <Footer />
    </>
  );
};

export default ItemDetails;
