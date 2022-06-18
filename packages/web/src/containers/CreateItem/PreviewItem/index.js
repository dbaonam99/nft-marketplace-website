import React from "react";
import useThemeMode from "../../../hooks/useThemeMode";
import "./index.css";

export default function PreviewItem({ image, name, price }) {
  const isLightMode = useThemeMode();

  return (
    <div
      className={
        isLightMode
          ? "preview-item l-bg bt-border-radius"
          : "preview-item dd-bg"
      }
    >
      <div className="preview-item-container">
        <div className="who-we-contant">
          <div className="dream-dots text-left">
            <span className="gradient-text ">Preview</span>
          </div>
        </div>
        <div className="main">
          {!image ? (
            <div className="main-text">
              <span className={isLightMode ? "text-dark" : "w-text"}>
                Upload file to preview your brand new NFT
              </span>
            </div>
          ) : (
            <div className="wrapper">
              <div className="image">
                <img src={image} alt="" />
              </div>
              <h4
                className={
                  isLightMode ? "nft-name text-dark" : "nft-name w-text"
                }
              >
                {name || "Untitled"}
              </h4>
              <div className={isLightMode ? "price-box bg-light" : "price-box"}>
                <div className="item">
                  <span
                    className={isLightMode ? "text-muted" : "text-white-50"}
                  >
                    Price
                  </span>
                  <span className={isLightMode ? "text-dark" : "w-text"}>
                    {price || "Not for sale"}
                  </span>
                </div>
                <div className="item">
                  <span
                    className={isLightMode ? "text-muted" : "text-white-50"}
                  >
                    Highest bid
                  </span>
                  <span className={isLightMode ? "text-dark" : "w-text"}>
                    No bids yet
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
