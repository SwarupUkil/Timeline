import {useState} from "react";
import {EntryCardContext} from "./Application.jsx";
import {useContext} from "react";
import PropTypes from "prop-types";

function EntryCard(props){

    const {idValue, keyValue} = useContext(EntryCardContext);
    const containerClasses = "card-container";

    const entryCardStates = [];
    for (let i = 1; i <= props.size; i++){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [imageRef, setImageRef] = useState("./assets/react.svg");
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
    const date = entryCardStates[keyValue][2][0];
    const description = entryCardStates[keyValue][3][0];

    return (
        <>
            <div id={idValue} className={containerClasses}>
                <div>{image}</div>
                <div>{title}</div>
                <div>{date}</div>
                <div>{description}</div>
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