import InfoComponent from '../../../components/InfoComponent'
import Card from '../../../components/Card'
// import AuthorsData from './data.json'
import {AuthorsData} from '../../../data/data-containers/data-Authors.js'
import useThemeMode from "../../../hooks/useThemeMode";
import { useTranslation } from 'react-i18next';

const CardSection = () => {
	const isLightMode = useThemeMode();
  const { t } = useTranslation();

	return (
    <>
		<section 
			className={isLightMode ? "section-padding-0-70 clearfix bg-light" : "section-padding-0-70 clearfix"}
		>
		    <div className="container">
		        
				<InfoComponent
					titleSm={t("common.exploreAuthors")}
					titleLg={t("common.ourAuthors")}
				/>
		            

		        <div className="row">
	            	{AuthorsData && AuthorsData.map((item , i) => (
	            		<Card
	            			key={i}
	            			imgBig={item.imgBig}
	            			imgSm={item.imgSm}
	            			name={item.name}
	            		/>
	            	))}
		        </div>
		    </div>
		</section>
    </>
  );
}

export default CardSection;