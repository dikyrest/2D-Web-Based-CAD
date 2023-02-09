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

    let rectangle = new Shape("rectangle", vertices, colors);
    allShapes.push(rectangle);
}

function drawRectangle(x, y) {
    let len = allShapes[allShapes.length-1].vertices.length;

    allShapes[allShapes.length-1].vertices[len-1][0] = x;
    allShapes[allShapes.length-1].vertices[len-1][1] = y;
    allShapes[allShapes.length-1].vertices[len-2][0] = x;
    allShapes[allShapes.length-1].vertices[len-3][1] = y;
}