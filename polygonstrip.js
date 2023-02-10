const poly_strip_button = document.getElementById('create-polygon-strip');

poly_strip_button.addEventListener('click', function() {
    if (isOnCreate === "poly-strip") {
        isOnCreate = "";
        poly_strip_button.textContent = 'Polygon Strip';
        poly_strip_button.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreate = "poly-strip";
        polyStripVertexCount = 0;
        poly_strip_button.textContent = 'Save';
        poly_strip_button.style.backgroundColor = '#808080';
        poly_strip_button.style.color = '#ffffff';
        disableButtonsExcept('create-polygon-strip');
    }
});

function makePolyStrip(x, y) {
    if (polyStripVertexCount === 0) {
        let vertices = [[x, y]];
        let colors = [[0,0,0,1]];

        let polyStrip = new PolyStrip(vertices, colors);
        allShapes.push(polyStrip);
    } else {
        allShapes[allShapes.length-1].vertices.push([x, y]);
        allShapes[allShapes.length-1].colors.push([0,0,0,1]);
    }
    polyStripVertexCount++;
}

function resizePolyStrip(indexes, x, y) {
    let shapeIndex = indexes[0];
    let vertexIndex = indexes[1];

    allShapes[shapeIndex].vertices[vertexIndex][0] = x;
    allShapes[shapeIndex].vertices[vertexIndex][1] = y;
}

function movePolyStrip(index, x, y) {
    let dx = x - allShapes[index].center()[0];
    let dy = y - allShapes[index].center()[1];
    allShapes[index].move(dx, dy);
}