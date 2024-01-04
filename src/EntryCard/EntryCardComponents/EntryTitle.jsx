import PropTypes from "prop-types";

function EntryTitle({title, index, update, disabled}){
    const inputClass = "entry-title"
    const type = "text";

    return (
        <>
            <input
                className={inputClass}
                type={type}
                value={title}
                onChange={(event) => update(index, "title", event.target.value)}
                disabled={disabled}
            />
        </>
    );
}

// PropTypes setup
EntryTitle.propTypes = {
    title: PropTypes.string,
    index: PropTypes.number,
    update: PropTypes.func,
    disabled: PropTypes.bool,
}

export default EntryTitle