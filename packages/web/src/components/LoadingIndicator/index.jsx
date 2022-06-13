import "./index.css";

function LoadingIndicator({ imgBig, imgSm, title, text }) {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingIndicator;
