import { useTranslation } from "react-i18next";
import useThemeMode from "../../../../hooks/useThemeMode";

const SearchWidgetArea = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();
  
  return (
    <>
      <div className="search-widget-area mb-50">
          <form>
              <input className={isLightMode ? "bt-border text-dark" : ""} type="search" name="search" id="search" placeholder={`${t("common.search")}...`} />
              <button type="submit" className={isLightMode ? "btn text-dark" : "btn"}><i className="fa fa-search"></i></button>
          </form>
      </div>
    </>
  );
}

export default SearchWidgetArea;