import PropTypes from "prop-types";

function DeleteEntryModal(props){
    const className = "modal";
    const message = "Are you sure you want to delete this entry?";

    if (props.deleteModalState){
        return (
            <>
                <div className={className}>
                    <div>{message}</div>
                    <div>
                        <button onClick={() => {props.onClickDeleteLogic(true)}}>Yes</button>
                        <button onClick={() => {props.onClickDeleteLogic(false)}}>No</button>
                    </div>
                </div>
            </>
        );
    }

    return (<></>);
}

// PropTypes setup
DeleteEntryModal.propTypes = {
    deleteModalState: PropTypes.bool,
    onClickDeleteLogic: PropTypes.func,
}

export default DeleteEntryModal