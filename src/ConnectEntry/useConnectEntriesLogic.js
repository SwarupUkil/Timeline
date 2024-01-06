import { useState, useEffect } from 'react';
import generatePath from "./generatePath.js";

// Core Connect Logic
const useConnectEntriesLogic = (size, currentView) => {


    const [connectState, setConnectState] = useState({first: null, second: null});
    const [connectSpecificEntries, setConnectSpecificEntries] = useState(new Map());
    const [connectEntries, setConnectEntries] = useState(new Map());

    const gridKeyToCoord = (entryKey) => {
        const index = entryKey - 1;
        const x = index % (Math.sqrt(size));
        const y = Math.floor(index / Math.sqrt(size));
        return {x: x, y: y};
    };

    // Assume entryOne < entryTwo
    const createConnectivePath = (entryOneKey, entryTwoKey) => {
        const coordOne = gridKeyToCoord(entryOneKey);
        const coordTwo = gridKeyToCoord(entryTwoKey);
        return generatePath(size, coordOne, coordTwo);
    };

    // currentConnections is a map, whose keys are gridKeys,
    // and values is an object containing left, right, up, down boolean states.
    // newConnections is an array of arrays containing [gridKey, pathValues].
    const updateEntries = (currentConnections, newConnections) => {

        for (const [gridKey, value] of newConnections){
            if (!currentConnections.has(gridKey)){
                currentConnections.set(gridKey, value); // verify currentConnections contains left, right, ... for this key.
            }
            currentConnections.get(gridKey).left |= value.left;
            currentConnections.get(gridKey).right |= value.right;
            currentConnections.get(gridKey).up |= value.up;
            currentConnections.get(gridKey).down |= value.down;
        }

        return currentConnections;
    };

    // This converts the details of the new entry connections into a form that is simpler, and takes out dependencies.
    // newConnections is a map which contains an array of maps, these inner maps have keys equaling gridKeys,
    // and values are objects containing the stateConnectedTo and the path.
    const adaptNewConnectEntries = (newConnections) => {

        const adaptedConnectionsMap = [];

        for (const arrOfConnections of newConnections.values()){
            // arrOfConnections is an array of objects which contain the path map too.
            for (const connection of arrOfConnections){
                for (const [gridKey, value] of connection.path.entries()){
                    adaptedConnectionsMap.push([gridKey, value]);
                }
            }
        }

        return adaptedConnectionsMap;
    };

    useEffect(() => {
        if (connectState.second && currentView === "connect-mode"){
            const newConnectEntries = new Map(connectSpecificEntries);
            const minEntryKey = Math.min(connectState.first, connectState.second);
            const maxEntryKey = Math.max(connectState.first, connectState.second);
            const path = createConnectivePath(minEntryKey, maxEntryKey);

            if (!newConnectEntries.has(minEntryKey)){
                newConnectEntries.set(minEntryKey, []);
            }
            if (!newConnectEntries.has(maxEntryKey)){
                newConnectEntries.set(maxEntryKey, []);
            }
            newConnectEntries.get(minEntryKey).push({stateConnectedTo: maxEntryKey, path: path});
            newConnectEntries.get(maxEntryKey).push({stateConnectedTo: minEntryKey, path: path});

            setConnectSpecificEntries(newConnectEntries);
            setConnectEntries(updateEntries(new Map(connectEntries), adaptNewConnectEntries(newConnectEntries)));
            setConnectState({first: null, second: null});
        }
    }, [connectState]);

    return {connectState, setConnectState, connectSpecificEntries, setConnectSpecificEntries, connectEntries, setConnectEntries};
};

export default useConnectEntriesLogic;