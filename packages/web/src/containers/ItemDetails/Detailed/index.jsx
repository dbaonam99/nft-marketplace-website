import DetailedImg from "../../../assets/img/art-work/detailed.jpg";
import useThemeMode from "../../../hooks/useThemeMode";

const Detailed = ({ imageUrl }) => {
  const isLightMode = useThemeMode();

  return (
    <>
      <div className="col-12 col-lg-5">
        <div className={isLightMode ? "light-detailed-img" : "detailed-img"}>
          <img src={imageUrl || DetailedImg} alt="" />
        </div>
      </div>
    </>
  );
};

export default Detailed;
