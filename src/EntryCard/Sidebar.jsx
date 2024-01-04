import {useContext, useEffect, useState} from "react";
import {EntryCardContext} from "../Application/Application.jsx";

function Sidebar(){

    const rightArrow = "M 21 10 L 29 50 L 21 90";
    // const idleLine = "M 25 10 L 25 90";
    const leftArrow = "M 29 10 L 21 50 L 29 90";
    const showStateValue = "show";
    const hiddenStateValue = "hidden";

    const [arrowState, setArrowState] = useState(rightArrow);
    const {setVisibilityValue, isSelected, deleteState} = useContext(EntryCardContext);
    const [arrowVisibility, setArrowVisibility] = useState(hiddenStateValue);

    // A reset for when user deletes an entry,
    // Or when the user unselects an entry.
    useEffect(() => {
        if (deleteState){
            setArrowState(rightArrow);
            setArrowVisibility(hiddenStateValue);
            setVisibilityValue(hiddenStateValue);
        }

        if (isSelected){
            setArrowVisibility(showStateValue);
        }else{
            setArrowState(rightArrow);
            setArrowVisibility(hiddenStateValue);
            setVisibilityValue(hiddenStateValue);
        }
    }, [deleteState, isSelected]);

    const onSideBarClick = () => {
        // if currently we see the right arrow, then set to left arrow,
        // else set to right arrow.
        if (arrowState === rightArrow){
            setArrowState(leftArrow);
            setVisibilityValue(showStateValue);
        }else{
            setArrowState(rightArrow);
            setVisibilityValue(hiddenStateValue);
        }
    }

    return (
        <>
            <div className={"arrow" + " " + arrowVisibility} onClick={onSideBarClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100">
                    <path d={arrowState} fill="transparent" stroke="black" strokeWidth="5"/>
                </svg>
            </div>
        </>
    );
}

export default Sidebar