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