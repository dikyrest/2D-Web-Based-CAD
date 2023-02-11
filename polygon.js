const polygon_button = document.getElementById('create-polygon');

polygon_button.addEventListener('click', function() {
    if (isOnCreate === "polygon") {
        isOnCreate = "";
        polygon_button.textContent = 'Polygon';
        enableAllButtons();
    } else {
        isOnCreate = "polygon";
        polygonVertexCount = 0;
        polygon_button.textContent = 'Save';
        disableButtonsExcept('create-polygon');
    }
});

function makePolygon(x, y) {
    if (polygonVertexCount === 0) {
        let vertices = [[x, y]];
        let colors = [[0,0,0,1]];

        let polygon = new Polygon(vertices, colors);
        allShapes.push(polygon);
    } else {
        allShapes[allShapes.length-1].vertices.push([x, y]);
        allShapes[allShapes.length-1].colors.push([0,0,0,1]);
    }
    polygonVertexCount++;
}

function resizePolygon(indexes, x, y) {
    let shapeIndex = indexes[0];
    let vertexIndex = indexes[1];

    allShapes[shapeIndex].vertices[vertexIndex][0] = x;
    allShapes[shapeIndex].vertices[vertexIndex][1] = y;
}

function movePolygon(index, x, y) {
    let dx = x - allShapes[index].center()[0];
    let dy = y - allShapes[index].center()[1];
    allShapes[index].move(dx, dy);
}