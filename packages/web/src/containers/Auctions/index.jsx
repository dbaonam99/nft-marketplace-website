import Breadcrumb from "../../components/Breadcrumb";
import LiveAuctions from "../../components/LiveAuctions";

const AuctionsContainer = () => {
  return (
    <>
      <Breadcrumb namePage="Auctions" title="Auctions" />
      <LiveAuctions />
    </>
  );
};

export default AuctionsContainer;
