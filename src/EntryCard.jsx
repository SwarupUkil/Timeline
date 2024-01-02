import {useEffect, useState} from "react";
import {EntryCardContext} from "./Application.jsx";
import {useContext} from "react";
import PropTypes from "prop-types";

function EntryImage(props){
    const imageClass = "entry-image";
    const inputId = "change-image";
    const type = "file";
    const accept= ".png, .jpg, .jpeg"

    const changeImage = (event) => {
        if (event.target.files && event.target.files[0]){
            const file = event.target.files[0]; // first uploaded image
            const reader = new FileReader();
            reader.onloadend = () => {props.update(props.index, "image", reader.result);}
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <img
                className={imageClass}
                src={props.image}
                alt={"Image of " + props.title}
                onClick={() => document.getElementById(inputId).click()}
            />
            <input id={inputId}
                   type={type}
                   accept={accept} onChange={changeImage} disabled={props.disabled}/>
        </>
    );
}

function EntryTitle(props){
    const inputClass = "entry-title"
    const type = "text";

    return (
        <>
            <input
                className={inputClass}
                type={type}
                value={props.title}
                onChange={(event) => props.update(props.index, "title", event.target.value)}
                disabled={props.disabled}
            />
        </>
    );
}

function EntryDate(props){
    const inputClass = "entry-date"
    const type = "text";

    return (
        <>
            <input
                className={inputClass}
                type={type}
                value={props.date}
                onChange={(event) => props.update(props.index, "date", event.target.value)}
                disabled={props.disabled}
            />
        </>
    );
}

function EntryDescription(props){
    const inputClass = "entry-description";

    return (
        <textarea
            className={inputClass}
            value={props.description}
            onChange={(event) => props.update(props.index, "description", event.target.value)}
            disabled={props.disabled}
        />
    );
}

function EntryCard(props){
    const defaults = {
        image: "freedom.png",
        title: "Enter Title",
        date: "01/01/2024",
        description: "Le description.",
    };

    const [entries, setEntries] = useState(
        new Array(props.size).fill(null).map(() => ({
            image: defaults.image,
            title: defaults.title,
            date: defaults.date,
            description: defaults.description,
        }))
    );

    // Function to update a specific entry's property
    const updateEntry = (index, stateKey, value) => {
        const newEntries = [...entries];
        newEntries[index] = {...newEntries[index], [stateKey]: value};
        setEntries(newEntries);
    };


    const {visibilityValue, keyValue, deleteState,
        setDeleteState, currentView} = useContext(EntryCardContext);
    const containerClasses = "card-container";
    const imageContainer = "image-container";
    const descriptionContainer = "description-container";

    const image = entries[keyValue]["image"];
    const title = entries[keyValue]["title"];
    const date = entries[keyValue]["date"];
    const description = entries[keyValue]["description"];

    // Verify if the user is allowed to edit timeline entries.
    const [userCanEdit, setUserCanEdit] = useState(currentView === "edit-mode");

    // Clear data
    useEffect(() => {
        if (deleteState){
            const newEntries = [...entries];
            newEntries[keyValue] = {
                image: defaults.image,
                title: defaults.title,
                date: defaults.date,
                description: defaults.description,
            }
            setEntries(newEntries);
            setDeleteState(false);
        }
    }, [deleteState]);

    // Disable editing abilities once currentView changes.
    useEffect(() => {
        setUserCanEdit(currentView === "edit-mode");
    }, [currentView]);

    return (
        <>
            <div id={visibilityValue} className={containerClasses + " " + (userCanEdit ? "": "reduced-interaction")}>
                <div id={imageContainer}>
                    <EntryImage image={image} title={title} index={keyValue} update={updateEntry} disabled={!userCanEdit}/>
                </div>
                <div id={descriptionContainer}>
                    <div>
                        <EntryTitle title={title} index={keyValue} update={updateEntry} disabled={!userCanEdit}/>
                        <EntryDate date={date} index={keyValue} update={updateEntry} disabled={!userCanEdit}/>
                    </div>
                    <EntryDescription description={description} index={keyValue} update={updateEntry} disabled={!userCanEdit}/>
                </div>
            </div>
        </>
    );
}

// PropTypes setup
EntryCard.propTypes = {
    size: PropTypes.number.isRequired,
};

EntryImage.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    index: PropTypes.number,
    update: PropTypes.func,
    disabled: PropTypes.bool,
}

EntryTitle.propTypes = {
    title: PropTypes.string,
    index: PropTypes.number,
    update: PropTypes.func,
    disabled: PropTypes.bool,
}

EntryDate.propTypes = {
    date: PropTypes.string,
    index: PropTypes.number,
    update: PropTypes.func,
    disabled: PropTypes.bool,
}

EntryDescription.propTypes = {
    description: PropTypes.string,
    index: PropTypes.number,
    update: PropTypes.func,
    disabled: PropTypes.bool,
}

// Exports
export default EntryCard