// Determines which lines in a  particular EntryGrid need to be shown for a given path.
// *** This is only for a line segment ***
const createPathSegment = (start, distance, isNegative, offset, size) => {
    const pathSegment = new Map();
    const createEmptyLinePath = () => ({negativeDir: false, positiveDir: false});

    for (let i = 0; Math.abs(i) < Math.abs(distance); isNegative ? i-- : i++) {
        const gridKey = start(i, size);
        if (!pathSegment.has(gridKey)) {
            pathSegment.set(gridKey, createEmptyLinePath());
        }

        const neighborKey = isNegative ? gridKey - offset : gridKey + offset;
        if (!pathSegment.has(neighborKey)) {
            pathSegment.set(neighborKey, createEmptyLinePath());
        }

        if (isNegative) {
            pathSegment.get(gridKey).negativeDir = true;
            pathSegment.get(neighborKey).positiveDir = true;
        } else {
            pathSegment.get(gridKey).positiveDir = true;
            pathSegment.get(neighborKey).negativeDir = true;
        }
    }

    return pathSegment;
};

export default createPathSegment;