import React from "react";

import "./footer.css";

import data from "../../data/data-layouts/data-Footer.json";

function Footer() {
  return (
    <footer className="main-footer text-center">
      <div className="widgets-section padding-top-small padding-bottom-small">
        <div className="container">
          <div className="row clearfix">
            <div className="footer-column col-md-4 col-sm-6 col-xs-12">
              <div className="footer-widget about-widget">
                <h3 className="has-line-center">Về Chúng Tôi</h3>
                <div className="widget-content">
                  <div className="text">
                    Website đầu tiên và duy nhất tại Việt Nam giúp bạn trao đổi,
                    mua bán NFT, với những NFT vô cùng có giá trị. Mang các nghệ
                    sĩ và nhà sáng tạo lại với nhau trên một nền tảng duy nhất.
                    Mua những NFT cao cấp và độc quyền được tạo bởi các nghệ sĩ
                    hàng đầu thế giới.
                  </div>
                  <ul className="social-links">
                    {data[0].iconsData &&
                      data[0].iconsData.map((item, i) => (
                        <li key={i}>
                          <a href="#">
                            <span key={i} className={item.icoClass}></span>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-column col-md-4 col-sm-6 col-xs-12">
              <div className="footer-widget contact-widget">
                <h3 className="has-line-center">Liên Hệ Chúng Tôi</h3>
                <div className="widget-content">
                  <ul className="contact-info">
                    <li>
                      <div className="icon">
                        <span className="flaticon-support"></span>
                      </div>
                    </li>
                    {data[1].infoData &&
                      data[1].infoData.map((item, i) => (
                        <li key={i}>{item.text}</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-column col-md-4 col-sm-12 col-xs-12">
              <div className="footer-widget newsletter-widget">
                <h3 className="has-line-center">Nhận Tin Mới</h3>
                <div className="widget-content">
                  <div className="text">
                    Giúp bạn cập nhật những thông tin mới nhất.
                  </div>
                  <div className="newsletter-form">
                    <form method="post">
                      <div className="form-group">
                        <input
                          type="email"
                          name="field-name"
                          placeholder="Email của bạn"
                        />
                        <button type="submit" className="send-btn">
                          <span className="fa fa-paper-plane-o"></span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="auto-container">
          <div className="copyright-text">Copyright ©. All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
