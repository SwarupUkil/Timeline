import {useState} from "react";
import {EntryCardContext} from "./Application.jsx";
import {useContext} from "react";
import PropTypes from "prop-types";

function EntryImage(props){
    const imageClass = "entry-image";

    return (
        <>
            <img
                className={imageClass}
                src={props.image}
                alt={"Image of " + props.title}
            />
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
                onChange={(event) => props.setTitle(event.target.value)}
            />
        </>
    );
}

function EntryDate(props){

    return (
        <>
            <div>{props.date}</div>
        </>
    );
}

function EntryDescription(props){

    return (
        <>
            <div>{props.description}</div>
        </>
    );
}

function EntryCard(props){

    const {idValue, keyValue} = useContext(EntryCardContext);
    const containerClasses = "card-container";
    const imageContainer = "image-container";
    const descriptionContainer = "description-container";

    const entryCardStates = [];
    for (let i = 1; i <= props.size; i++){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [imageRef, setImageRef] = useState("./src/assets/freedom.png");
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [title, setTitle] = useState("Enter Title");
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [date, setDate] = useState("01/01/2024");
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [description, setDescription] = useState("Le description.");
        entryCardStates.push([[imageRef, setImageRef],
                              [title, setTitle],
                              [date, setDate],
                              [description, setDescription]]);
    }

    const image = entryCardStates[keyValue][0][0];
    const title = entryCardStates[keyValue][1][0];
    const setTitle = entryCardStates[keyValue][1][1];
    const date = entryCardStates[keyValue][2][0];
    const description = entryCardStates[keyValue][3][0];

    return (
        <>
            <div id={idValue} className={containerClasses}>
                <div id={imageContainer}>
                    <EntryImage image={image} title={title}/>
                </div>
                <div id={descriptionContainer}>
                    <div>
                        <EntryTitle title={title} setTitle={setTitle}/>
                        <EntryDate date={date} />
                    </div>
                    <EntryDescription description={description} />
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
}

EntryTitle.propTypes = {
    title: PropTypes.string,
    setTitle: PropTypes.func,
}

EntryDate.propTypes = {
    date: PropTypes.string,
}

EntryDescription.propTypes = {
    description: PropTypes.string,
}

// Exports
export default EntryCard