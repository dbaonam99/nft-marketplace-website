import { SlideCountdown } from 'react-fancy-countdown';

import authors1 from "../../../assets/img/authors/1.png"
import {data} from '../../../data/data-containers/data-HighestBid.js'
// import data from './data.json'
import useThemeMode from "../../../hooks/useThemeMode";

const HighestBid = () => {
  const isLightMode = useThemeMode();

  return (
    <>
      <div className="col-12 col-lg-3 mt-s">
          <h4 className={isLightMode ? "mb-15 text-dark" : "mb-15"}>Latest Bids</h4>
          <div className={isLightMode ? "highest-bid bid-item bt-bg-light" : "highest-bid bid-item"}>
              {data && data.map((item , i) => (
                <div key={i} className={`author-item ${item.addMargin && 'mb-0'}`}>
                    <div className="author-img ml-0"><img src={item.img} width="40" alt=""/></div>
                    <div className="author-info">
                        <p className={isLightMode ? "text-muted" : ""}>by<span className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}> {item.text}</span></p>
                        <p className={isLightMode ? "text-muted" : ""}>Bid at<span className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}> {item.bid} ETH</span></p>
                    </div>
                    <div className="bid-price">
                        <p className={isLightMode ? "text-muted" : ""}>$346.38</p>
                        <p className={isLightMode ? "text-muted" : ""}><i className="fa fa-clock-o mr-5p"></i>{item.time} AM</p>
                    </div>
                </div>
              ))}
          </div>
          <h4 className={isLightMode ? "mb-15 mt-30 text-dark" : "mb-15 mt-30"}>History</h4>
          <div className={isLightMode ? "highest-bid bid-item bt-bg-light" : "highest-bid bid-item"}>
              <div className="author-item mb-0">
                  <div className="author-img ml-0"><img src={authors1} width="40" alt="" /></div>
                  <div className="author-info">
                      <p className={isLightMode ? "mb-15 text-dark" : "mb-15"}>Listed by<span className={isLightMode ? "text-dark" : "w-text"}> Amillia Nnor</span></p>
                      <p className={isLightMode ? "mb-15 text-dark" : "mb-15"}>Price<span className={isLightMode ? "text-dark mr-15" : "w-text mr-15"}> 0.212 ETH</span><span><i className="fa fa-clock-o mr-5p"></i>01:36 AM</span></p>
                  </div>
                  
              </div>
          </div>
          <div className={isLightMode ? "biding-end bt-border" : "biding-end"}>
              <h4 className={isLightMode ? "mb-15 text-dark" : "mb-15"}>Biding Ends In :</h4>
              <div className="count-down titled circled text-center">
                <SlideCountdown
                  weeks={false}
                  deadline="2030-12-31 14:23:22" />
              </div>
          </div>

      </div>
    </>
  );
}

export default HighestBid;