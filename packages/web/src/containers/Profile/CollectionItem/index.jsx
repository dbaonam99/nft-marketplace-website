import PartProfile from "../../../components/PartProfile";
import CreateItemArtworkfire from "../../../assets/img/art-work/fire.png";
import CreateItemDataIcon from "../../../data/data-containers/data-CollectionItem-Profile.json";

const CollectionItem = ({ user }) => {
  return (
    <>
      <PartProfile
        img1={user?.cover}
        img2={user?.avatar}
        img3={CreateItemArtworkfire}
        data={CreateItemDataIcon}
        user={user}
      />
    </>
  );
};

export default CollectionItem;
