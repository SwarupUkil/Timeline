import PropTypes from "prop-types";

function EntryDate({date, index, update, disabled}){
    const inputClass = "entry-date"
    const type = "text";

    return (
        <>
            <input
                className={inputClass}
                type={type}
                value={date}
                onChange={(event) => update(index, "date", event.target.value)}
                disabled={disabled}
            />
        </>
    );
}

// PropTypes setup
EntryDate.propTypes = {
    date: PropTypes.string,
    index: PropTypes.number,
    update: PropTypes.func,
    disabled: PropTypes.bool,
}

export default EntryDate