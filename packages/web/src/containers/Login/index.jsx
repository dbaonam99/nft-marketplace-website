import { useTranslation } from 'react-i18next'
import Breadcumb from '../../components/Breadcumb'
import InfoComponent from '../../components/InfoComponent'
import useThemeMode from '../../hooks/useThemeMode'
import ContactForm from './ContactForm'

const LoginContainer = () => {
	const isLightMode = useThemeMode();
	const { t } = useTranslation();

  return (
    <>
		<Breadcumb  
			namePage={t("common.login")}
			title={t("common.login")}
			animNone={false}
		/>
	    <section 
				className={isLightMode ? "section-padding-100 contact_us_area bg-light" : "section-padding-100 contact_us_area"}
				id="contact"
			>
	        <div className="container">
	            <div className="row">
	                <div className="col-12">
	                	<InfoComponent
	                		titleSm={t("login.loginNow")}
	                		titleLg={t("login.loginToAccount")}
	                		// text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.'
	                	/>
	                </div>
	            </div>
	            <ContactForm />
	        </div>
	    </section>
    </>
  );
}

export default LoginContainer;