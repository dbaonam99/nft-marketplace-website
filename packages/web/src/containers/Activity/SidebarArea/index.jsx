import DonnotMissWidget from "./DonnotMissWidget";

const SidebarAreaContainer = ({ filter, setFilter }) => {
  return (
    <>
      <div className="col-12 col-md-3">
        <div className="sidebar-area">
          {/* <SearchWidgetArea /> */}

          <DonnotMissWidget filter={filter} setFilter={setFilter} />

          {/* <SubscribeWidget /> */}
        </div>
      </div>
    </>
  );
};

export default SidebarAreaContainer;
