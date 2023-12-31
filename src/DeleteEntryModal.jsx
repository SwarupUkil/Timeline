import PropTypes from "prop-types";

function DeleteEntryModal(props){

    const modalClassName = "modal";
    const message = "Are you sure you want to delete this entry?";
    const buttonClassName = "modal-button";

    if (props.deleteModalState){
        return (
            <>
                <div className={modalClassName}>
                    <div>{message}</div>
                    <div>
                        <button className={buttonClassName}
                                onClick={() => {props.onClickDeleteLogic(true)}}>Yes</button>
                        <button className={buttonClassName}
                                onClick={() => {props.onClickDeleteLogic(false)}}>No</button>
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