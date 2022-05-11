const HeroContainer = () => {
  return (
    <section className="hero-section moving section-padding" id="home">
      <div className="moving-bg"></div>
      <div className="hero-section-content">
        <div className="container ">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 col-md-12">
              <div className="welcome-content">
                <div className="promo-section">
                  <h3 className="special-head gradient-text">
                    Tất cả NFT bạn cần đều có tại đây
                  </h3>
                </div>
                <h1>
                  Nơi bạn có thể sưu tầm, mua và bán{" "}
                  <span className="gradient-text">những NFT tuyệt nhất</span>{" "}
                </h1>
                <p className="w-text">
                  Website đầu tiên và duy nhất tại Việt Nam giúp bạn trao đổi,
                  mua bán NFT, với những NFT vô cùng có giá trị. Mang các nghệ
                  sĩ và nhà sáng tạo lại với nhau trên một nền tảng duy nhất.
                  Mua những NFT cao cấp và độc quyền được tạo bởi các nghệ sĩ
                  hàng đầu thế giới.
                </p>
                <div className="dream-btn-group">
                  <button className="btn btn-explore more-btn mr-3">
                    Tìm hiểu thêm
                  </button>
                  <button className="btn btn-Collect more-btn">
                    Sưu tầm NFT
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContainer;
