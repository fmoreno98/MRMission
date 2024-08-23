export function createWorld(side, obstacles, initialRoverPosition) {
    const size = side * side;
    const numOnes = obstacles;
    const array = new Array(size).fill(0);

    function getRandomIndices(arraySize, numIndices) {
        const indices = new Set();
        while (indices.size < numIndices) {
            indices.add(Math.floor(Math.random() * arraySize));
        }
        return Array.from(indices);
    }

    // Get random unique indices
    const indices = getRandomIndices(size, numOnes);

    // Place `1`s at the random indices
    indices.forEach(index => {
        array[index] = 1;
    });

    // Convert initial rover position to index
    const roverIndex = initialRoverPosition[1] * side + initialRoverPosition[0];

    // Ensure the initial rover position is obstacle-free
    if (array[roverIndex] === 1) {
        array[roverIndex] = 0;
        // Optionally, you can adjust the number of obstacles if needed:
    }

    return array;
}