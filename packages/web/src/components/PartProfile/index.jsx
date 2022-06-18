import useThemeMode from "../../hooks/useThemeMode";

function PartProfile({ img1, img2, img3, data, user }) {
  const isLightMode = useThemeMode();

  return (
    <div className="col-12 col-lg-3">
      <div
        className={
          isLightMode
            ? "service_single_content collection-item l-bg"
            : "service_single_content collection-item"
        }
      >
        <div className="collection_icon">
          <img src={img1} className="center-block" alt="" />
        </div>
        <span className={isLightMode ? "aut-info bt-border" : "aut-info"}>
          <img src={img2} width="50" alt="" />
        </span>
        <div className="collection_info text-center">
          <h6 className={isLightMode ? "text-dark" : ""}>{user?.username}</h6>
          <p className={isLightMode ? "text-dark mr-5p" : "w-text mr-5p"}>
            Creative NFTs Designer <img src={img3} width="20" alt="" />
          </p>

          <div className="search-widget-area mt-15">
            <form action="#" method="post">
              <input
                className={isLightMode ? "bt-border text-dark pr-3" : "pr-5"}
                type="text"
                name="wallet"
                id="wallet"
                value={user?.ethAddress}
              />
              <button className={isLightMode ? "btn text-dark" : "btn"}>
                <i className="fa fa-copy"></i>
              </button>
            </form>
          </div>

          {/* <ul className="social-links mt-30 mb-30">
            {data &&
              data.map((item, i) => (
                <li key={i}>
                  <a href="#" className={isLightMode ? "bt-bg-light" : ""}>
                    <span className={item.classIcon}></span>
                  </a>
                </li>
              ))}
          </ul>
          <a href="profile.html" className="more-btn">
            {t("common.follow")}
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default PartProfile;
