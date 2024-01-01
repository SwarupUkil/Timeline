import {useState} from "react";

function Sidebar(){

    // rightArrow = "M 21 10 L 29 50 L 21 90";
    // idleLine = "M 25 10 L 25 90";
    // leftArrow = "M 29 10 L 21 50 L 29 90";
    const [arrowState, setArrowState] = useState("M 21 10 L 29 50 L 21 90");

    const onSideBarClick = () => {
        // if currently is right arrow, then set to left arrow
        // else set to left arrow.
        if (arrowState === "M 21 10 L 29 50 L 21 90"){
            setArrowState("M 29 10 L 21 50 L 29 90");
        }else{
            setArrowState("M 21 10 L 29 50 L 21 90");
        }
    }

    return (
        <>
            <div className="arrow" onClick={onSideBarClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100">
                    <path d={arrowState} fill="transparent" stroke="black" strokeWidth="5"/>
                </svg>
            </div>
        </>
    );
}

export default Sidebar