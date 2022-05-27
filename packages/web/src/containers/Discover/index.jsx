import Breadcrumb from "../../components/Breadcrumb";
import TopCollections from "../../components/TopCollections";
import ListedItems from "../../components/ListedItems";

const DiscoverContainer = () => {
  return (
    <>
      <Breadcrumb namePage="Discover" title="Discover" />
      <TopCollections />
      <ListedItems />
    </>
  );
};

export default DiscoverContainer;
