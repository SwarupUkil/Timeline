import PropTypes from "prop-types";

function HeaderButton(props){

    // View mode logic
    const changeView = (viewType) => () => {props.setCurrentView(viewType);};
    const viewSelect = (currentView, viewType) => {
        return currentView === viewType ? "view-select" : "";
    };

    // Name to display. I.e. "edit-mode" => "Edit" on button.
    const viewName = (viewType) => {
        return viewType.charAt(0).toUpperCase() + viewType.slice(1).replace("-mode", "");
    };

    return (
        <button className={"modal-button" + " " + viewSelect(props.currentView, props.viewType)}
                onClick={changeView(props.viewType)}>
            {viewName(props.viewType)}
        </button>
    );
}

function Header(props){
    return (
        <div id={"header"}>
            <div id={"header-view-buttons"}>
                <HeaderButton currentView={props.currentView} setCurrentView={props.setCurrentView} viewType={"view-mode"}/>
                <HeaderButton currentView={props.currentView} setCurrentView={props.setCurrentView} viewType={"edit-mode"}/>
                <HeaderButton currentView={props.currentView} setCurrentView={props.setCurrentView} viewType={"connect-mode"}/>
            </div>
        </div>
    );
}

// PropTypes setup
Header.propTypes = {
    currentView: PropTypes.string,
    setCurrentView: PropTypes.func,
}

HeaderButton.propTypes = {
    currentView: PropTypes.string,
    setCurrentView: PropTypes.func,
    viewType: PropTypes.string,
}

export default Header