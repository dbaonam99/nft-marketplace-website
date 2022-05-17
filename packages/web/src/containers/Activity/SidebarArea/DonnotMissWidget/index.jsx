import {FilterData} from '../../../../data/data-containers/Sidebar-data.js'
import useThemeMode from '../../../../hooks/useThemeMode.js';
// import FilterData from './data.json'
const DonnotMissWidget = () => {
  const isLightMode = useThemeMode();

  return (
    <>
      <div className="donnot-miss-widget mb-50">
          <div className="widget-title">
              <h5 className={isLightMode ? "text-dark bt-border-color" : ""}>Filters</h5>
          </div>
          <div className="filers-list">
              {FilterData && FilterData.map((item , i) => (
                <button key={i} className={isLightMode ? "filter-item text-dark bt-border" : "filter-item"}>
                    {!isLightMode && <img src={item.img} alt="" />}{item.text}
                </button>                                    
              ))}
          </div>
      </div>
    </>
  );
}

export default DonnotMissWidget;