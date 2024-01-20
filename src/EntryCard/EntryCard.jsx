import {useEffect, useState} from "react";
import {EntryCardContext} from "../Application/Application.jsx";
import {useContext} from "react";
import EntryImage from "./EntryCardComponents/EntryImage.jsx";
import EntryTitle from "./EntryCardComponents/EntryTitle.jsx";
import EntryDate from "./EntryCardComponents/EntryDate.jsx";
import EntryDescription from "./EntryCardComponents/EntryDescription.jsx";
import {defaultMap, defaults} from "./EntryCardLogic.js";

function EntryCard(){

    const {visibilityValue, currentView, entryIdCounter, selectedEntryId, entryIcons, setEntryIcons} = useContext(EntryCardContext);

    // Manages every entries values
    const [entries, setEntries] = useState(defaultMap);

    // Function to update a specific entry's property
    const updateEntry = (entryId, stateKey, value) => {

        const newEntries = new Map(entries);

        // Update the data in a specific entry
        if (newEntries.has(entryId)){
            newEntries.set(entryId, {...newEntries.get(entryId), [stateKey]: value});
        }

        // Default entry data for next entry to be added
        if (!newEntries.has(entryId + 1)){
            newEntries.set(entryId + 1, defaults);
        }

        // Update the icon a given entry its card image
        if (stateKey === "image"){
            const updateIconImage = new Map(entryIcons);
            updateIconImage.set(entryId, value);
            setEntryIcons(updateIconImage);
        }

        setEntries(newEntries);
    };


    const containerClasses = "card-container";
    const imageContainer = "image-container";
    const descriptionContainer = "description-container";

    const image = entries.get(selectedEntryId).image;
    const title = entries.get(selectedEntryId).title;
    const date = entries.get(selectedEntryId).date;
    const description = entries.get(selectedEntryId).description;

    // Verify if the user is allowed to edit timeline entries
    const [userCanEdit, setUserCanEdit] = useState(currentView === "edit-mode");


    // Clear entry data, currently not useful functional
    // #TODO

    // Determine if user can edit timeline entry
    useEffect(() => {
        setUserCanEdit(currentView === "edit-mode");
    }, [currentView]);

    // Everytime a new entry is created, give it default values
    useEffect(() => {
        updateEntry(entryIdCounter, "", null);
    }, [entryIdCounter]);


    return (
        <>
            <div id={visibilityValue} className={containerClasses + " " + (userCanEdit ? "": "reduced-interaction")}>
                <div id={imageContainer}>
                    <EntryImage image={image} title={title} index={selectedEntryId} update={updateEntry} disabled={!userCanEdit}/>
                </div>
                <div id={descriptionContainer}>
                    <div>
                        <EntryTitle title={title} index={selectedEntryId} update={updateEntry} disabled={!userCanEdit}/>
                        <EntryDate date={date} index={selectedEntryId} update={updateEntry} disabled={!userCanEdit}/>
                    </div>
                    <EntryDescription description={description} index={selectedEntryId} update={updateEntry} disabled={!userCanEdit}/>
                </div>
            </div>
        </>
    );
}


// Exports
export default EntryCard