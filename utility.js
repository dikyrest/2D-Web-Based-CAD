function flatten(mat) {
    if (mat.matrix) {
        mat = transpose(mat);
    }

    let n = mat.length;
    let elemsAreArrays = false;

    if (Array.isArray(mat[0])) {
        elemsAreArrays = true;
        n *= mat[0].length;
    }

    const floats = new Float32Array(n);

    if (elemsAreArrays) {
        let i = 0;
        for (let j=0; j<mat.length; j++) {
            for (let k=0; k<mat[j].length; k++) {
                floats[i++] = mat[j][k];
            }
        }
    } else {
        for (let i=0; i<mat.length; i++) {
            floats[i] = mat[i];
        }
    }

    return floats;
}

function mod (n, m) {
    return ((n % m) + m) % m;
}

function getAllVertices() {
    let allVertices = [];

    for (let i=0; i<allShapes.length; i++) {
        for (let j=0; j<allShapes[i].vertices.length; j++) {
            allVertices.push(allShapes[i].vertices[j]);
        }
    }

    return allVertices;
}

function getAllColors() {
    let allColors = [];

    for (let i=0; i<allShapes.length; i++) {
        for (let j=0; j<allShapes[i].colors.length; j++) {
            allColors.push(allShapes[i].colors[j]);
        }
    }

    return allColors;
}

function getAllCenters() {
    let allCenters = [];

    for (let i=0; i<allShapes.length; i++) {
        allCenters.push(allShapes[i].center());
    }

    return allCenters;
}

function disableButtonsExcept(buttonId) {
    for (button of buttons) {
        if (button.id != buttonId) {
            button.disabled = true;
        }
    }
}

function enableAllButtons() {
    for (button of buttons) {
        button.disabled = false;
    }
}

function isNearVertex(x, y) {
    let allVertices = getAllVertices();

    for (let i=0; i<allVertices.length; i++) {
        if (Math.sqrt(Math.pow(x - allVertices[i][0], 2) + Math.pow(y - allVertices[i][1], 2)) < 0.02) {
            return true;
        }
    }

    return false;
}

function isNearCenter(x, y) {
    let allCenters = getAllCenters();

    for (let i=0; i<allCenters.length; i++) {
        if (Math.sqrt(Math.pow(x - allCenters[i][0], 2) + Math.pow(y - allCenters[i][1], 2)) < 0.1) {
            return true;
        }
    }

    return false;
}

function getNearestVertex(x, y) {
    let minDist = Infinity;
    let minIndex = -1;

    for (let i=0; i<allShapes.length; i++) {
        for (let j=0; j<allShapes[i].vertices.length; j++) {
            let dist = Math.sqrt(Math.pow(x - allShapes[i].vertices[j][0], 2) + Math.pow(y - allShapes[i].vertices[j][1], 2));

            if (dist < minDist) {
                minDist = dist;
                minIndex = [i, j];
            }
        }
    }

    return minIndex;
}

function getNearestCenter(x, y) {
    let minDist = Infinity;
    let minIndex = -1;

    for (let i=0; i<allShapes.length; i++) {
        let dist = Math.sqrt(Math.pow(x - allShapes[i].center()[0], 2) + Math.pow(y - allShapes[i].center()[1], 2));

        if (dist < minDist) {
            minDist = dist;
            minIndex = i;
        }
    }

    return minIndex;
}