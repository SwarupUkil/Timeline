import {useEffect, useState} from "react";
import {useDrop} from "react-dnd";

const useDropLogic = (setSelectedEntryId, gridKey, setSelectGridItemKey, connectSpecificEntries, setConnectSpecificEntries) => {

    const [currentEntryNumber, setCurrentEntryNumber] = useState(null);
    const [isHovering, setIsHovering] = useState(false);

    // Former grid entry's number is replaced to null, and current one is updated to former grids number.
    const onDropItem = (entryNumber, formerGridEntryNumberSetter) => {

        const newConnectEntries = new Map(connectSpecificEntries);

        // Remove connection to current entry from other entries
        if (newConnectEntries.has(entryNumber)){
            for (const connectedToEntryNumber of newConnectEntries.get(entryNumber)){
                const indexOfConnectedToEntryNumber = newConnectEntries.get(connectedToEntryNumber).indexOf(entryNumber);
                newConnectEntries.get(connectedToEntryNumber).splice(indexOfConnectedToEntryNumber, 1);
            }
        }

        newConnectEntries.set(entryNumber, []);
        setConnectSpecificEntries(newConnectEntries);


        formerGridEntryNumberSetter(null);
        setCurrentEntryNumber(entryNumber);
        setSelectedEntryId(entryNumber);
        setSelectGridItemKey(gridKey);
    }

    // Core drop logic
    const [{isOver}, gridRef] = useDrop(() => ({
        accept: "entry",
        drop: (item, monitor) => {
            if (monitor.canDrop()){
                onDropItem(item.entryId, item.formerGridEntryNumberSetter); // Update states with correct data.
            }
        },
        hover: () => setIsHovering(true),
        canDrop: () => {return !currentEntryNumber},
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [currentEntryNumber, connectSpecificEntries]);

    // Reset hover state when the item is no longer over the component
    useEffect(() => {
        if (!isOver) {
            setIsHovering(false);
        }
    }, [isOver]);

    return {currentEntryNumber, setCurrentEntryNumber, isHovering, gridRef};
};

export default useDropLogic