import Breadcrumb from "../../components/Breadcrumb"
import TopCollections from "../../components/TopCollections"
import ListedItems from "../../components/ListedItems"
import { useTranslation } from "react-i18next";

const DiscoverContainer = () => {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumb
        namePage={t("header.discover")}
        title={t("header.discover")}
      />
      <TopCollections />
      <ListedItems />
    </>
  );
};

export default DiscoverContainer;
