import {useEffect, useState} from "react";
import {EntryCardContext} from "../Application/Application.jsx";
import {useContext} from "react";
import PropTypes from "prop-types";
import EntryImage from "./EntryCardComponents/EntryImage.jsx";
import EntryTitle from "./EntryCardComponents/EntryTitle.jsx";
import EntryDate from "./EntryCardComponents/EntryDate.jsx";
import EntryDescription from "./EntryCardComponents/EntryDescription.jsx";

function EntryCard(props){

    // Default values for a timeline entry
    const defaults = {
        image: "freedom.png",
        title: "Enter Title",
        date: "01/01/2024",
        description: "Le description.",
    };

    // Manages every entries values
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

    // Verify if the user is allowed to edit timeline entries
    const [userCanEdit, setUserCanEdit] = useState(currentView === "edit-mode");

    // Clear entry data
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

    // Determine if user can edit timeline entry
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

// Exports
export default EntryCard