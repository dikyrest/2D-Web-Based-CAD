square_button = document.getElementById("create-square");

square_button.addEventListener("click", function () {
    if (isOnCreate === "square") {
        isOnCreate = "";
        square_button.textContent = "Square";
        enableAllButtons();
    } else {
        isOnCreate = "square";
        square_button.textContent = "Save";
        disableButtonsExcept("create-square");
    }
});

function makeSquare(x, y) {
    let vertices = [];
    let colors = [];

    for (let i = 0; i < 4; i++) {
        vertices.push([x, y]);
        colors.push([0, 0, 0, 1]);
    }

    let square = new Square(vertices, colors);
    allShapes.push(square);
}

function drawSquare(x, y) {
    let count = allShapes[allShapes.length - 1].vertices.length;
    let start = allShapes[allShapes.length - 1].vertices[0];
    let length = x - allShapes[allShapes.length - 1].vertices[0][0];
    let width = y - allShapes[allShapes.length - 1].vertices[0][1];
    let edge = Math.min(Math.abs(length), Math.abs(width));

    allShapes[allShapes.length - 1].vertices[count - 1][0] = start[0] + (edge * Math.sign(length));
    allShapes[allShapes.length - 1].vertices[count - 1][1] = start[1] + (edge * Math.sign(width));
    allShapes[allShapes.length - 1].vertices[count - 2][0] = start[0] + (edge * Math.sign(length));
    allShapes[allShapes.length - 1].vertices[count - 3][1] = start[1] + (edge * Math.sign(width));
}
