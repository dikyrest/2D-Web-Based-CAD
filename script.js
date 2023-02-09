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

var vertices = [];
var colors = [];

var isOnCreate = false;
var isDrawing = false;

render();

canvas.addEventListener('mousemove', function(e) {
    if (isDrawing) {
        let x = (2 * (e.clientX - canvas.offsetLeft)) / canvas.clientWidth - 1;
        let y = 1 - (2 * (e.clientY - canvas.offsetTop)) / canvas.clientHeight;

        vertices[vertices.length - 1][0] = x;
        vertices[vertices.length - 1][1] = y;
        vertices[vertices.length - 2][0] = x;
        vertices[vertices.length - 3][1] = y;
    }
});

canvas.addEventListener('mousedown', function(e) {
    if (isOnCreate) {
        let x = (2 * (e.clientX - canvas.offsetLeft)) / canvas.clientWidth - 1;
        let y = 1 - (2 * (e.clientY - canvas.offsetTop)) / canvas.clientHeight;

        for (let i=0; i<4; i++) {
            vertices.push([x, y]);
            colors.push([0,0,0,1]);
        }

        isDrawing = true;
    }

    console.log(vertices);
});

canvas.addEventListener('mouseup', function(e) {
    if (isOnCreate) {
        isDrawing = false;
    }
});

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    const vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    const vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    for (let i=0; i<vertices.length; i+=4) {
        gl.drawArrays(gl.POINTS, i, 4);
        gl.drawArrays(gl.TRIANGLE_STRIP, i, 4);
    };

    window.requestAnimationFrame(render);
}