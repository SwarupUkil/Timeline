import useConnectEntriesLogic from "./useConnectEntriesLogic.js";
import {useEffect, useRef, useState} from "react";

const useConnectLogic = (size, currentView) => {

    // connect-entry use case states
    const {connectState, setConnectState, connectSpecificEntries,setConnectSpecificEntries} = useConnectEntriesLogic(size, currentView);
    const transformWrapperRef = useRef(null);
    const [scale, setScale] = useState({minScale: 0.5, maxScale: 2});
    const [position, setPosition] = useState({x: 0, y:0});

    useEffect(() => {
        const zoomAmount = 1;
        transformWrapperRef.current.setTransform(position.x, position.y, zoomAmount);

        const newScale = {};
        newScale.minScale = (currentView !== "view-mode") ? 1 : 0.5;
        newScale.maxScale = (currentView !== "view-mode") ? 1 : 2;
        setScale(newScale);
    }, [currentView]);

    return {connectState, setConnectState, connectSpecificEntries, setConnectSpecificEntries, transformWrapperRef, scale, setPosition};
};

export default useConnectLogic;