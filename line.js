const line_button = document.getElementById('create-line');

line_button.addEventListener('click', function() {
    if (isOnCreate === "line") {
        isOnCreate = "";
        line_button.textContent = 'Line';
        line_button.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreate = "line";
        lineVertexCount = 0;
        line_button.textContent = 'Save';
        line_button.style.backgroundColor = '#808080';
        line_button.style.color = '#ffffff';
        disableButtonsExcept('create-line');
    }
});

function makeLine(x, y) {
    if (lineVertexCount === 0 ) {
        let vertices = [[x, y]];
        var colors = [[0,0,0,1]];
        
        let line = new Line(vertices, colors);
        allShapes.push(line);
    } else {
        allShapes[allShapes.length-1].vertices.push([x, y]);
        allShapes[allShapes.length-1].colors.push([0,0,0,1]);
    }
    lineVertexCount++;
}

function resizeLine(indexes, x, y) {
    let shapeIndex = indexes[0];
    let vertexIndex = indexes[1];

    allShapes[shapeIndex].vertices[vertexIndex][0] = x;
    allShapes[shapeIndex].vertices[vertexIndex][1] = y;
}

function moveLine(index, x, y) {
    let dx = x - allShapes[index].center()[0];
    let dy = y - allShapes[index].center()[1];
    allShapes[index].move(dx, dy);
}