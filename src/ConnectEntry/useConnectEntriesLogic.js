import { useState, useEffect } from 'react';

// Core Connect Logic
const useConnectEntriesLogic = (size, currentView) => {

    const [connectState, setConnectState] = useState({first: null, second: null});
    const [connectSpecificEntries, setConnectSpecificEntries] = useState(new Map());

    useEffect(() => {
        if (connectState.second && currentView === "connect-mode"){
            const newConnectEntries = new Map(connectSpecificEntries);

            // Make sure entries exists
            if (!newConnectEntries.has(connectState.first)){
                newConnectEntries.set(connectState.first, []);
            }
            if (!newConnectEntries.has(connectState.second)){
                newConnectEntries.set(connectState.second, []);
            }

            // Adds a connection between entries is they don't exist, or removes them if they do exist.
            const indexOfFirstInSecond = newConnectEntries.get(connectState.second).indexOf(connectState.first);
            const indexOfSecondInFirst = newConnectEntries.get(connectState.first).indexOf(connectState.second);

            if (indexOfFirstInSecond  === -1 && indexOfSecondInFirst === -1){
                newConnectEntries.get(connectState.first).push(connectState.second);
                newConnectEntries.get(connectState.second).push(connectState.first);
            }else{
                newConnectEntries.get(connectState.second).splice(indexOfFirstInSecond, 1);
                newConnectEntries.get(connectState.first).splice(indexOfSecondInFirst, 1);
            }


            setConnectSpecificEntries(newConnectEntries);
            setConnectState({first: null, second: null}); // User needs to select two new states again.
        }
    }, [connectState]);

    return {connectState, setConnectState, connectSpecificEntries, setConnectSpecificEntries};
};

export default useConnectEntriesLogic;