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
                onChange={(event) => props.update(props.index, "title", event.target.value)}
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
    // const inputClass = "entry-description"
    // const onChange = (event) => props.setDescription(event.target.textContent);
    //
    // return (
    //     <>
    //         <div className={inputClass}
    //              contentEditable={true}
    //              onChange={onChange}
    //         >
    //             {props.description}
    //         </div>
    //     </>
    // );
}

function EntryCard(props){

    const [entries, setEntries] = useState(
        new Array(props.size).fill(null).map(() => ({
            image: "./src/assets/freedom.png",
            title: "Enter Title",
            date: "01/01/2024",
            description: "Le description."
        }))
    );

    // Function to update a specific entry's property
    const updateEntry = (index, stateKey, value) => {
        const newEntries = [...entries];
        newEntries[index] = {...newEntries[index], [stateKey]: value};
        setEntries(newEntries);
    };


    const {idValue, keyValue} = useContext(EntryCardContext);
    const containerClasses = "card-container";
    const imageContainer = "image-container";
    const descriptionContainer = "description-container";

    // const entryCardStates = [];
    // for (let i = 1; i <= props.size; i++){
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     const [imageRef, setImageRef] = useState("./src/assets/freedom.png");
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     const [title, setTitle] = useState("Enter Title");
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     const [date, setDate] = useState("01/01/2024");
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     const [description, setDescription] = useState("Le description.");
    //     entryCardStates.push([[imageRef, setImageRef],
    //                           [title, setTitle],
    //                           [date, setDate],
    //                           [description, setDescription]]);
    // }

    // const image = entries[keyValue][0][0];
    // const title = entries[keyValue][1][0];
    // const setTitle = entries[keyValue][1][1];
    // const date = entries[keyValue][2][0];
    // const description = entries[keyValue][3][0];
    // const setDescription = entries[keyValue][3][1];

    const image = entries[keyValue]["image"];
    const title = entries[keyValue]["title"];
    const date = entries[keyValue]["date"];
    // const description = entries[keyValue][3][0];

    return (
        <>
            <div id={idValue} className={containerClasses}>
                <div id={imageContainer}>
                    <EntryImage image={image} title={title} index={keyValue} update={updateEntry}/>
                </div>
                <div id={descriptionContainer}>
                    <div>
                        <EntryTitle title={title} index={keyValue} update={updateEntry}/>
                        <EntryDate date={date} index={keyValue} update={updateEntry}/>
                    </div>
                    {/*<EntryDescription description={description} setDescription={setDescription} index={keyValue} update={updateEntry}/>*/}
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
}

EntryTitle.propTypes = {
    title: PropTypes.string,
    index: PropTypes.number,
    update: PropTypes.func,
}

EntryDate.propTypes = {
    date: PropTypes.string,
    index: PropTypes.number,
    update: PropTypes.func,
}

EntryDescription.propTypes = {
    description: PropTypes.string,
    index: PropTypes.number,
    update: PropTypes.func,
}

// Exports
export default EntryCard