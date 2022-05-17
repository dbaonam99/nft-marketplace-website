import useThemeMode from "../../../../../hooks/useThemeMode";

const WidgetTitle = () => {
  const isLightMode = useThemeMode();

  return (
    <>
      <div className="widget-title wow fadeInUp" data-wow-delay="0.9s">
          <h5 className={isLightMode ? "text-dark bt-border-color" : ""}>subscribe</h5>
      </div>
    </>
  );
}

export default WidgetTitle;