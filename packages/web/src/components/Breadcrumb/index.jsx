import React from "react";

import "./breadcrumb.css";

function BreadcrumbContainer({
  namePage,
  title,
  animNone = true,
  addFade = true,
}) {
  return (
    <div className="breadcrumb-area clearfix">
      <div className="breadcrumb-content">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <nav
                aria-label="breadcrumb"
                data-aos={`${animNone && addFade ? "fade-up" : ""}`}
                className="breadcrumb--con text-center"
              >
                <h2 className="title wow fadeInUp">{namePage}</h2>
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a>Home</a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    {title}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadcrumbContainer;
