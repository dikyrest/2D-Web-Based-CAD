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

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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
    for (let button of buttons) {
        if (button.id !== buttonId) {
            button.disabled = true;
        }
    }
}

function disableButtonConvexHull() {
    for (let button of buttons) {
        if (button.id === 'convex-hull') {
            button.disabled = true;
            isConvexHull = false;
        }
    }
}

function enableAllButtons() {
    for (let button of buttons) {
        if (button.id !== 'convex-hull') {
            button.disabled = false;
        }
    }
}

function enableButtonConvexHull() {
    for (let button of buttons) {
        if (button.id === 'convex-hull') {
            button.disabled = false;
        }
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

function showVertexProperties(indexes) {
    let shapeIndex = indexes[0];
    let vertexIndex = indexes[1];

    let x = allShapes[shapeIndex].vertices[vertexIndex][0];
    let y = allShapes[shapeIndex].vertices[vertexIndex][1];

    let r = allShapes[shapeIndex].colors[vertexIndex][0];
    let g = allShapes[shapeIndex].colors[vertexIndex][1];
    let b = allShapes[shapeIndex].colors[vertexIndex][2];

    let vertexProperties = document.getElementById("properties-container");
    vertexProperties.innerHTML = "<b>VERTEX</b><b>Shape:</b> " + allShapes[shapeIndex].type + "<b>Vertex:</b> " + vertexIndex + "<b>X:</b> " + x + "<b>Y:</b> " + y;
    vertexProperties.innerHTML += "<b>Color:</b> <input type='color' id='vertex-color' value='" + rgbToHex(r*255, g*255, b*255) + "'>";
    if (["polygon", "poly-strip"].includes(allShapes[shapeIndex].type)) {
        vertexProperties.innerHTML += "<div><button id='remove-vertex'>Remove Vertex</button></div>";
        document.getElementById("remove-vertex").onclick = function() { removeVertex(indexes); };
    }

    document.getElementById("vertex-color").onchange = function() { changeVertexColor(indexes); };
}

function showShapeProperties(index) {
    let x = allShapes[index].center()[0];
    let y = allShapes[index].center()[1];

    let shapeProperties = document.getElementById("properties-container");
    shapeProperties.innerHTML = "<b>SHAPE</b><b>Shape:</b> " + allShapes[index].type + "<b>Center:</b> (" + x + ", " + y + ")";
    shapeProperties.innerHTML += "<b>Color:</b> <input type='color' id='shape-color' name='shape-color' value='#000000'>";
    shapeProperties.innerHTML += "<b>Rotation:</b> <input type='range' id='rotation-theta' name='rotation-theta' min=0 max=360 value='" + allShapes[index].theta + "'>";
    shapeProperties.innerHTML += "<div><button id='remove-shape'>Remove Shape</button></div>";

    if (allShapes[index].type === "line") {
        let length = allShapes[index].calcLength();
        shapeProperties.innerHTML += "<b>Length:</b> " + length;
    } else if (allShapes[index].type === "square") {
        let sideLength = allShapes[index].calcSideLength();
        shapeProperties.innerHTML += "<b>Side Length:</b> <input type='number' id='square-length' value=" + sideLength + ">" + "<div><button id='save-length'>Save</button></div>";
    } else if (allShapes[index].type === "rectangle") {
        let length = allShapes[index].calcLength();
        let width = allShapes[index].calcWidth();
        shapeProperties.innerHTML += "<b>Length:</b> <input type='number' id='rectangle-length' value=" + length + "> <b>Width:</b> <input type='number' id='rectangle-width' value=" + width + ">" + "<div><button id='save-length'>Save</button></div>";
    } else if (["polygon", "poly-strip"].includes(allShapes[index].type)) {
        shapeProperties.innerHTML += "<div><button id='add-vertex'>Add Vertex</button></div>";
        document.getElementById("add-vertex").onclick = function() { addVertex(index); };
    }

    document.getElementById("shape-color").onchange = function() { changeShapeColor(index); };
    document.getElementById("rotation-theta").onchange = function() { rotateShape(index); };
    document.getElementById("remove-shape").onclick = function() { removeShape(index); };
    document.getElementById("save-length").onclick = function() {
        if (allShapes[index].type ==="square") {
            changeSizeSquare(index);
        } else {
            changeSizeRectangle(index);
        }
    };
}

function changeVertexColor(indexes) {
    let shapeIndex = indexes[0];
    let vertexIndex = indexes[1];

    let color = document.getElementById("vertex-color").value;
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    allShapes[shapeIndex].colors[vertexIndex] = [r/255, g/255, b/255, 1];
}

function changeShapeColor(index) {
    let color = document.getElementById("shape-color").value;
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);

    for (let i=0; i<allShapes[index].colors.length; i++) {
        allShapes[index].colors[i] = [r/255, g/255, b/255, 1];
    }
}

function changeSizeRectangle(index){
    let length = document.getElementById("rectangle-length").value;
    let width = document.getElementById("rectangle-width").value;

    if (allShapes[index].vertices[1][1] < allShapes[index].vertices[0][1]) {
        allShapes[index].vertices[1][1] = allShapes[index].vertices[0][1] - parseFloat(width);
        allShapes[index].vertices[3][1] = allShapes[index].vertices[0][1] - parseFloat(width);
    } else {
        allShapes[index].vertices[1][1] = allShapes[index].vertices[0][1] + parseFloat(width);
        allShapes[index].vertices[3][1] = allShapes[index].vertices[0][1] + parseFloat(width);
    }
    
    if (allShapes[index].vertices[2][0] < allShapes[index].vertices[0][0]) {
        allShapes[index].vertices[2][0] = allShapes[index].vertices[0][0] - parseFloat(length);
        allShapes[index].vertices[3][0] = allShapes[index].vertices[0][0] - parseFloat(length);
    } else {
        allShapes[index].vertices[2][0] = allShapes[index].vertices[0][0] + parseFloat(length);
        allShapes[index].vertices[3][0] = allShapes[index].vertices[0][0] + parseFloat(length);
    }
}

function changeSizeSquare(index){
    let length = document.getElementById("square-length").value;

    if (allShapes[index].vertices[1][1] < allShapes[index].vertices[0][1]) {
        allShapes[index].vertices[1][1] = allShapes[index].vertices[0][1] - parseFloat(length);
        allShapes[index].vertices[3][1] = allShapes[index].vertices[0][1] - parseFloat(length);
    } else {
        allShapes[index].vertices[1][1] = allShapes[index].vertices[0][1] + parseFloat(length);
        allShapes[index].vertices[3][1] = allShapes[index].vertices[0][1] + parseFloat(length);
    }
    
    if (allShapes[index].vertices[2][0] < allShapes[index].vertices[0][0]) {
        allShapes[index].vertices[2][0] = allShapes[index].vertices[0][0] - parseFloat(length);
        allShapes[index].vertices[3][0] = allShapes[index].vertices[0][0] - parseFloat(length);
    } else {
        allShapes[index].vertices[2][0] = allShapes[index].vertices[0][0] + parseFloat(length);
        allShapes[index].vertices[3][0] = allShapes[index].vertices[0][0] + parseFloat(length);
    }

}

function rotateShape(index) {
    let theta = document.getElementById("rotation-theta").value;

    allShapes[index].rotate(theta);
}

function removeVertex(indexes) {
    let shapeIndex = indexes[0];
    let vertexIndex = indexes[1];

    if (allShapes[shapeIndex].vertices.length > 3) {
        allShapes[shapeIndex].vertices.splice(vertexIndex, 1);
        allShapes[shapeIndex].colors.splice(vertexIndex, 1);
    }
}

function addVertex(index) {
    if (onAddVertexIndex === -1) {
        disableButtonsExcept("");
        document.getElementById("add-vertex").textContent = "Save";
        onAddVertexIndex = index;
    } else {
        enableAllButtons();
        document.getElementById("add-vertex").textContent = "Add Vertex";
        onAddVertexIndex = -1;
    }
}

function addVertexAt(x, y) {
    allShapes[onAddVertexIndex].vertices.push([x, y]);
    allShapes[onAddVertexIndex].colors.push([0, 0, 0, 1]);
}

function removeShape(index) {
    allShapes.splice(index, 1);
}

function pointOrientation(point1, point2, point3){
    let test = (point2[1] - point1[1]) * (point3[0] - point2[0]) - (point2[0] - point1[0]) * (point3[1] - point2[1])
    if (test === 0){
        return 0 //collinear
    }
    if ( test > 0 ) {
        return 1 //clock
    }
    return 2 //counterlock wise
}