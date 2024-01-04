import PropTypes from "prop-types";

function EntryDescription({description, index, update, disabled}){
    const inputClass = "entry-description";

    return (
        <textarea
            className={inputClass}
            value={description}
            onChange={(event) => update(index, "description", event.target.value)}
            disabled={disabled}
        />
    );
}

// PropTypes setup
EntryDescription.propTypes = {
    description: PropTypes.string,
    index: PropTypes.number,
    update: PropTypes.func,
    disabled: PropTypes.bool,
}

export default EntryDescription