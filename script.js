const vSource = `
    attribute vec4 vPosition;
    attribute vec4 vColor;
    varying vec4 fColor;
    void main() {
        gl_Position = vPosition;
        gl_PointSize = 10.0;
        fColor = vColor;
    }
`;

const fSource = `
    precision mediump float;
    varying vec4 fColor;
    void main() {
        gl_FragColor = fColor;
    }
`;

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.8, 0.8, 0.8, 1.0);

// Create shaders
const vShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vShader, vSource);
gl.compileShader(vShader);

const fShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fShader, fSource);
gl.compileShader(fShader);

// Create program
const program = gl.createProgram();
gl.attachShader(program, vShader);
gl.attachShader(program, fShader);
gl.linkProgram(program);
gl.useProgram(program);

const vBuffer = gl.createBuffer();
const cBuffer = gl.createBuffer();

let allVertices = [];
let allColors = [];
let allShapes = [];
let allCenters = [];

const button_container = document.getElementById('create-button-container');
const buttons = button_container.getElementsByTagName('button');

/*
 * Possible values:
 * - line
 * - square
 * - rectangle
 * - polygon
 * - poly-strip
 */
let isOnCreate = "";
let isDrawing = "";
let isDragging = "";
let isMoving = "";

let onDragVertexIndex = []; // [shapeIndex, vertexIndex]
let onMoveShapeIndex = -1; // shapeIndex
let onAddVertexIndex = -1; // shapeIndex

let polygonVertexCount = 0;
let polyStripVertexCount = 0;

render();

canvas.addEventListener('mousedown', function(e) {
    // Get mouse position
    let x = (2 * (e.clientX - canvas.offsetLeft)) / canvas.clientWidth - 1;
    let y = 1 - (2 * (e.clientY - canvas.offsetTop)) / canvas.clientHeight;

    if (isOnCreate === "line") {
        isDrawing = "line";
        makeLine(x, y);
    } else if (isOnCreate === "rectangle") {
        isDrawing = "rectangle";
        makeRectangle(x, y);
    } else if (isOnCreate === "square") {
        isDrawing = "square";
        makeSquare(x, y);
    } else if (isNearVertex(x, y)) {
        onDragVertexIndex = getNearestVertex(x, y);
        isDragging = allShapes[onDragVertexIndex[0]].type;
    } else if (isNearCenter(x, y)) {
        onMoveShapeIndex = getNearestCenter(x, y);
        isMoving = allShapes[onMoveShapeIndex].type;
    }
});

canvas.addEventListener('mousemove', function(e) {
    let x = (2 * (e.clientX - canvas.offsetLeft)) / canvas.clientWidth - 1;
    let y = 1 - (2 * (e.clientY - canvas.offsetTop)) / canvas.clientHeight;

    if (isDrawing === "line") {
        drawLine(x,y);
    } else if (isDrawing === "rectangle") {
        drawRectangle(x, y);
    } else if (isDrawing === "square") {
        drawSquare(x, y);
    } else if (isDragging === "line") {
        resizeLine(onDragVertexIndex, x, y);
    } else if (isDragging === "rectangle") {
        resizeRectangle(onDragVertexIndex, x, y);
    } else if (isDragging === "polygon") {
        resizePolygon(onDragVertexIndex, x, y);
    } else if (isDragging === "poly-strip") {
        resizePolyStrip(onDragVertexIndex, x, y);
    } else if (isMoving === "rectangle") {
        moveRectangle(onMoveShapeIndex, x, y);
    } else if (isMoving === "line") {
        moveLine(onMoveShapeIndex, x, y);
    } else if (isMoving === "polygon") {
        movePolygon(onMoveShapeIndex, x, y);
    } else if (isMoving === "poly-strip") {
        movePolyStrip(onMoveShapeIndex, x, y);
    }
});

canvas.addEventListener('mouseup', function() {
    if (isOnCreate) {
        isDrawing = "";
        console.log(allShapes);
    } else if (isDragging) {
        onDragVertexIndex = [];
        isDragging = "";
    } else if (isMoving) {
        onMoveShapeIndex = -1;
        isMoving = "";
    }
});

canvas.addEventListener('click', function(e) {
    // Get mouse position
    let x = (2 * (e.clientX - canvas.offsetLeft)) / canvas.clientWidth - 1;
    let y = 1 - (2 * (e.clientY - canvas.offsetTop)) / canvas.clientHeight;

    if (isOnCreate === "polygon") {
        makePolygon(x, y);
        console.log(allShapes);
    } else if (isOnCreate === "poly-strip") {
        makePolyStrip(x, y);
        console.log(allShapes);
    } else if (onAddVertexIndex !== -1) {
        addVertexAt(x, y);
        console.log(allShapes);
    } else if (isNearVertex(x, y)) {
        let indexes = getNearestVertex(x, y);
        showVertexProperties(indexes);
    } else if (isNearCenter(x, y)) {
        let index = getNearestCenter(x, y);
        showShapeProperties(index);
    }
});

function render() {
    // Clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Create buffers
    allVertices = getAllVertices();
    allColors = getAllColors();
    allCenters = getAllCenters();

    // Bind buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(allVertices), gl.STATIC_DRAW);

    const vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(allColors), gl.STATIC_DRAW);

    const vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // Draw all shapes
    let j = 0;
    for (let i = 0; i < allShapes.length; i++) {
        if (allShapes[i].type === 'line') {
            gl.drawArrays(gl.POINTS, j, 2);
            gl.drawArrays(gl.LINES, j, 2);
            j += 2;
        } else if (allShapes[i].type === 'rectangle') {
            gl.drawArrays(gl.POINTS, j, 4);
            gl.drawArrays(gl.TRIANGLE_STRIP, j, 4);
            j += 4;
        } else if (allShapes[i].type === 'square') {
            gl.drawArrays(gl.POINTS, j, allShapes[i].vertices.length);
            gl.drawArrays(gl.TRIANGLE_STRIP, j, allShapes[i].vertices.length);
            j += 4;
        } else if (allShapes[i].type === 'polygon') {
            gl.drawArrays(gl.POINTS, j, allShapes[i].vertices.length);
            gl.drawArrays(gl.TRIANGLE_FAN, j, allShapes[i].vertices.length);
            j += allShapes[i].vertices.length;
        } else if (allShapes[i].type === 'poly-strip') {
            gl.drawArrays(gl.POINTS, j, allShapes[i].vertices.length);
            gl.drawArrays(gl.TRIANGLE_STRIP, j, allShapes[i].vertices.length);
            j += allShapes[i].vertices.length;
        }
    }

    window.requestAnimationFrame(render);
}
