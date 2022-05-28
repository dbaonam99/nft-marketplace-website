import Breadcumb from '../../components/Breadcumb'
import Detailed from './Detailed'
import SidebarArea from './SidebarArea'
import HighestBid from './HighestBid'
import TestPopup from './TestPopup'
import clsx from "clsx";

import '../../assets/css/itemDetails.css'
import useThemeMode from '../../hooks/useThemeMode'
import { useTranslation } from 'react-i18next'

const ItemDetailsContainer = () => {
  const isLightMode = useThemeMode();
  const { t } = useTranslation();

  return (
    <>
      <Breadcumb  
        namePage={t("header.itemDetails")}
        title={t("header.itemDetails")}
      />
      <section 
        className={
          clsx(
            "section-padding-100",
            isLightMode && "bg-light"
          )
        }
      >
          <div className="container">

              <div className="row">
                  <Detailed />

                  <SidebarArea />

                  <HighestBid />
              </div>
          </div>
      </section>
      <TestPopup />
    </>
  );
}

export default ItemDetailsContainer;