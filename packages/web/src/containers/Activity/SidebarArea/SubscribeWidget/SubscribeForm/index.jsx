import useThemeMode from "../../../../../hooks/useThemeMode";

const SubscribeForm = () => {
  const isLightMode = useThemeMode();

  return (
    <>
      <div className="subscribe-form">
          <form action="#">
              <input className={isLightMode ? "bt-border text-dark" : ""} type="email" name="email" id="subs_email" placeholder="Your Email" />
              <button type="submit" className="btn login-btn mb-0">subscribe</button>
          </form>
      </div>
    </>
  );
}

export default SubscribeForm;