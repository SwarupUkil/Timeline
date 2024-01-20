import useConnectEntriesLogic from "./useConnectEntriesLogic.js";
import {useEffect, useRef, useState} from "react";

const useConnectLogic = (size, currentView) => {

    // connect-entry use case states
    const {connectState, setConnectState, connectSpecificEntries,setConnectSpecificEntries} = useConnectEntriesLogic(size, currentView);
    const transformWrapperRef = useRef(null);
    const [scale, setScale] = useState({minScale: 0.5, maxScale: 2});
    const [position, setPosition] = useState({x: 0, y:0, scale: 1});

    useEffect(() => {
        const newScale = {};

        if (currentView !== "view-mode"){
            if (position.scale < 1){
                transformWrapperRef.current.zoomIn(1.3 - position.scale, 100);
            }else if (position.scale > 1){
                transformWrapperRef.current.zoomOut(position.scale - 1.3, 100);
            }

        }

        newScale.minScale = (currentView !== "view-mode") ? 1 : 0.5;
        newScale.maxScale = (currentView !== "view-mode") ? 1 : 1.5;
        setScale(newScale);
    }, [currentView]);

    return {connectState, setConnectState, connectSpecificEntries, setConnectSpecificEntries, transformWrapperRef, scale, setPosition};
};

export default useConnectLogic;