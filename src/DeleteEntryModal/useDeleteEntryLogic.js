import { useState, useEffect } from 'react';

const useDeleteEntryLogic = (currentView, isSelected) => {
    const [deleteState, setDeleteState] = useState(false); // True if user agreed to delete entry
    const [deleteModalState, setDeleteModalState] = useState(false); // True if user attempted to delete entry

    // Delete timeline entry logic
    useEffect(() => {
        const onDeleteIsDown = (event) => {
            // keyCode 8 refers to shift key, metakey = cmd, ctrlkey = ctrl.
            if ((currentView === "edit-mode") && (event.keyCode === 16) && (event.metaKey || event.ctrlKey) && isSelected){
                setDeleteModalState(true);
            }
        };

        window.addEventListener('keydown', onDeleteIsDown);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', onDeleteIsDown);
        };
    }, [isSelected, currentView]);

    // Entry will be deleted upon user confirmation
    const confirmDelete = (confirmDeletion) => {
        if (confirmDeletion){
            setDeleteState(true);
        }

        setDeleteModalState(false);
    };

    return {deleteState, setDeleteState, deleteModalState, confirmDelete};
};

export default useDeleteEntryLogic;