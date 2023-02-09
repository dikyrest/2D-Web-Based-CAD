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

// [shapeIndex, vertexIndex]
let nearestVertexIndex = [];

// shapeIndex
let nearestCenterIndex = -1;

render();

canvas.addEventListener('mousemove', function(e) {
    let x = (2 * (e.clientX - canvas.offsetLeft)) / canvas.clientWidth - 1;
    let y = 1 - (2 * (e.clientY - canvas.offsetTop)) / canvas.clientHeight;

    if (isDrawing === "rectangle") {
        drawRectangle(x, y);
    } else if (isDragging === "rectangle") {
        resizeRectangle(x, y);
    } else if (isMoving === "rectangle") {
        moveRectangle(x, y);
    } else {
        canvas.style.cursor = "default";
    }
});

canvas.addEventListener('mousedown', function(e) {
    let x = (2 * (e.clientX - canvas.offsetLeft)) / canvas.clientWidth - 1;
    let y = 1 - (2 * (e.clientY - canvas.offsetTop)) / canvas.clientHeight;

    if (isOnCreate === "rectangle") {
        makeRectangle(x, y);
        isDrawing = "rectangle";
    } else if (isNearVertex(x, y)) {
        nearestVertexIndex = getNearestVertex(x, y);
        isDragging = allShapes[nearestVertexIndex[0]].type;
    } else if (isNearCenter(x, y)) {
        nearestCenterIndex = getNearestCenter(x, y);
        isMoving = allShapes[nearestCenterIndex].type;
    }
});

canvas.addEventListener('mouseup', function() {
    if (isOnCreate) {
        isDrawing = "";
        console.log(allShapes);
    } else if (isDragging) {
        nearestVertexIndex = [];
        isDragging = "";
    } else if (isMoving) {
        nearestCenterIndex = -1;
        isMoving = "";
    }
});

canvas.addEventListener('click', function(e) {
    let x = (2 * (e.clientX - canvas.offsetLeft)) / canvas.clientWidth - 1;
    let y = 1 - (2 * (e.clientY - canvas.offsetTop)) / canvas.clientHeight;

    if (isNearVertex(x, y)) {
        nearestVertexIndex = getNearestVertex(x, y);
        showVertexProperties();
    }

    console.log(nearestVertexIndex);
});

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    allVertices = getAllVertices();
    allColors = getAllColors();
    allCenters = getAllCenters();

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

    let j = 0;
    for (let i=0; i<allShapes.length; i++) {
        if (allShapes[i].type === 'rectangle') {
            gl.drawArrays(gl.POINTS, j, 4);
            gl.drawArrays(gl.TRIANGLE_STRIP, j, 4);
            j += 4;
        }
    }

    window.requestAnimationFrame(render);
}