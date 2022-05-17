import useThemeMode from "../../hooks/useThemeMode";
import clsx from "clsx";

function TopSellersItem({rank , img ,title ,price}){
  const isLightMode = useThemeMode();

  return(
    <div className="author-item">
        <div className="author-rank">{rank}</div>
        <div className="author-img"><img src={img} width="70" alt="" /></div>
        <div className="author-info">
            <a href="profile.html"><h5 className={clsx("author-name", isLightMode && "text-dark")}>{title}</h5></a>
            <p className={clsx("author-earn mb-0", isLightMode && "text-muted")}>{price} ETH</p>
        </div>
    </div>
  )
}

export default TopSellersItem



