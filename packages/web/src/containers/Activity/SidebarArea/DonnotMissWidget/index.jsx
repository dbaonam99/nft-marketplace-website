import { useTranslation } from 'react-i18next';
import { FilterData } from '../../../../data/data-containers/Sidebar-data.js'
import useThemeMode from '../../../../hooks/useThemeMode.js';
// import FilterData from './data.json'
import clsx from "clsx";

const DonnotMissWidget = ({ filter, setFilter }) => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <div className="donnot-miss-widget mb-50">
        <div className="widget-title">
          <h5 className={isLightMode ? "text-dark bt-border-color" : ""}>{t("common.filters")}</h5>
        </div>
        <div className="filers-list">
          {FilterData && FilterData.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={
                clsx(
                  "filter-item mr-2",
                  isLightMode && "bt-border",
                  (isLightMode && filter !== item.id) && "text-dark",
                  filter === item.id && (isLightMode ? "filter-item-active-light" : "filter-item-active")
                )
              }>
              {!isLightMode && <img src={item.img} alt="" />}{t(item.text)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default DonnotMissWidget;