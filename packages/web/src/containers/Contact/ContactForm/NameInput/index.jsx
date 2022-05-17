import useThemeMode from "../../../../hooks/useThemeMode";

function NameInput({Class , delay , name , title}){
	const isLightMode = useThemeMode();

	return(
        <div className={Class}>
            <div className="group" data-aos-delay={delay} data-aos="fade-up">
                <input className={isLightMode ? "text-dark bt-border-color-muted" : ""} type="text" name={name} id="name" required />
                <span className="highlight"></span>
                <span className={isLightMode ? "bar-light" : "bar"}></span>
                <label className={isLightMode ? "text-dark" : ""}>{title}</label>
            </div>
        </div>
	)
}

export default NameInput