const rectangle_button = document.getElementById('create-rectangle');

rectangle_button.addEventListener('click', function() {
    if (isOnCreate === "rectangle") {
        isOnCreate = "";
        rectangle_button.textContent = 'Rectangle';
        rectangle_button.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreate = "rectangle";
        rectangle_button.textContent = 'Save';
        rectangle_button.style.backgroundColor = '#808080';
        rectangle_button.style.color = '#ffffff';
        disableButtonsExcept('create-rectangle');
    }
});

function makeRectangle(x, y) {
    let vertices = [];
    let colors = [];

    for (let i=0; i<4; i++) {
        vertices.push([x, y]);
        colors.push([0,0,0,1]);
    }

    let rectangle = new Rectangle(vertices, colors);
    allShapes.push(rectangle);
}

function drawRectangle(x, y) {
    allShapes[allShapes.length-1].vertices[3][0] = x;
    allShapes[allShapes.length-1].vertices[3][1] = y;
    allShapes[allShapes.length-1].vertices[2][0] = x;
    allShapes[allShapes.length-1].vertices[1][1] = y;
}

function resizeRectangle(indexes, x, y) {
    let shapeIndex = indexes[0];
    let vertexIndex = indexes[1];

    allShapes[shapeIndex].vertices[vertexIndex][0] = x;
    allShapes[shapeIndex].vertices[vertexIndex][1] = y;
    if (mod(vertexIndex, 2) === 0) {
        allShapes[indexes[0]].vertices[mod((indexes[1]+1), 4)][0] = x;
        allShapes[indexes[0]].vertices[mod((indexes[1]+2), 4)][1] = y;
    } else {
        allShapes[indexes[0]].vertices[mod((indexes[1]-1), 4)][0] = x;
        allShapes[indexes[0]].vertices[mod((indexes[1]-2), 4)][1] = y;
    }
}

function moveRectangle(index, x, y) {
    let dx = x - allShapes[index].center()[0];
    let dy = y - allShapes[index].center()[1];
    allShapes[index].move(dx, dy);
}