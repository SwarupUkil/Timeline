import createPathSegment from "./createPathSegment.js";

// left-right
const generateHorizontalPath = (coordOne, horizontalDist, size) => {

    // For left-right, the x changes towards coordTwo.x, y is constant with coordOne.y
    // so gridKey = (coordOne.x + i) + (coordOne.y * Math.sqrt(size)) + 1.
    // **We have a +1 because the do entryKey - 1 in gridKeyToCoord function**.
    const start = (i, size) => (coordOne.x + i) + (coordOne.y * Math.sqrt(size)) + 1;

    return createPathSegment(start, horizontalDist, horizontalDist < 0, 1, size);
};

// up-down
const generateVerticalPath = (coordOne, coordTwo, verticalDist, size) => {

    // gridKey = coordTwo.x + (coordOne.y + i) * Math.sqrt(size) + 1
    // For up-down, the y changes towards coordTwo.y, x is constant with coordTwo.x.
    // **We have a +1 because the do entryKey - 1 in gridKeyToCoord function**.
    const start = (i, size) => coordTwo.x + ((coordOne.y + i) * Math.sqrt(size)) + 1;
    return createPathSegment(start, verticalDist, verticalDist < 0, Math.sqrt(size), size);
};

const generatePath = (size, coordOne, coordTwo) => {

    // Each key will have an array of classes for left, right, up, down
    const horizontalDist = coordTwo.x - coordOne.x;
    const verticalDist = coordTwo.y - coordOne.y;

    const horizontalPath = generateHorizontalPath(coordOne, horizontalDist, size);
    const verticalPath = generateVerticalPath(coordOne, coordTwo, verticalDist, size);

    const path = new Map(); // map contains values 1-25 with an array of strings for up/down,left/right.

    // Helper function to merge new path into current path.
    const mergePath = (key, newPath, isHorizontal) => {
        if (!path.has(key)) {
            path.set(key, {left: false, right: false, up: false, down: false});
        }

        const existingPath = path.get(key);

        if (isHorizontal){
            path.set(key, {
                left: existingPath.left || newPath.negativeDir,
                right: existingPath.right || newPath.positiveDir,
                up: existingPath.up,
                down: existingPath.down,
            });
        }else{
            path.set(key, {
                left: existingPath.left,
                right: existingPath.right,
                up: existingPath.up || newPath.negativeDir,
                down: existingPath.down || newPath.positiveDir,
            });
        }
    };

    // Merge horizontal and vertical paths
    for (const [key, newPath] of horizontalPath) {
        mergePath(key, newPath, true);
    }

    for (const [key, newPath] of verticalPath) {
        mergePath(key, newPath, false);
    }

    return path;
};

export default generatePath;