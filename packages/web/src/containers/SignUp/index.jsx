import Breadcumb from '../../components/Breadcumb'
import InfoComponent from '../../components/InfoComponent'
import ContactForm from './ContactForm'
import useThemeMode from '../../hooks/useThemeMode'
import { useTranslation } from 'react-i18next'

const SignUpContainer = () => {
	const isLightMode = useThemeMode();
	const { t } = useTranslation();

  return (
    <>
		<Breadcumb  
			namePage={t("common.signUp")}
			title={t("common.signUp")}
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
		              titleSm={t("signup.signupNow")}
		              titleLg={t("signup.signupToAccount")}
		            />
		          </div>
		      </div>

		      <ContactForm />
		  </div>
		</section>
    </>
  );
}

export default SignUpContainer;