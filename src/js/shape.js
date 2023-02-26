class Shape {
    constructor(type, vertices, colors, theta) {
        this.id = allShapes.length;
        this.type = type;
        this.theta = theta;
        this.vertices = vertices;
        this.colors = colors;
    }

    move(dx, dy) {
        for (let i=0; i<this.vertices.length; i++) {
            this.vertices[i][0] += dx;
            this.vertices[i][1] += dy;
        }
    }

    rotate(newTheta) {
        let dtheta = newTheta - this.theta;
        let center = this.center();

        for (let i=0; i<this.vertices.length; i++) {
            let x = this.vertices[i][0] - center[0];
            let y = this.vertices[i][1] - center[1];

            this.vertices[i][0] = center[0] + x * Math.cos(dtheta * Math.PI/180) - y * Math.sin(dtheta * Math.PI/180);
            this.vertices[i][1] = center[1] + x * Math.sin(dtheta * Math.PI/180) + y * Math.cos(dtheta * Math.PI/180);
        }

        this.theta = parseInt(newTheta);
    }
}

class Line extends Shape {
    constructor(vertices, colors, theta=0) {
        super("line", vertices, colors, theta);
    }

    center() {
        let x = (this.vertices[0][0] + this.vertices[1][0]) / 2;
        let y = (this.vertices[0][1] + this.vertices[1][1]) / 2;
        return [x, y];
    }

    calcLength() {
        return Math.sqrt(Math.pow(this.vertices[1][0] - this.vertices[0][0], 2) + Math.pow(this.vertices[1][1] - this.vertices[0][1], 2));
    }
}

class Rectangle extends Shape {
    constructor(vertices, colors, theta=0) {
        super("rectangle", vertices, colors, theta);
    }

    center() {
        let x = (this.vertices[0][0] + this.vertices[3][0]) / 2;
        let y = (this.vertices[0][1] + this.vertices[3][1]) / 2;
        return [x, y];
    }

    calcLength() {
        return Math.sqrt(Math.pow(this.vertices[2][0] - this.vertices[0][0], 2) + Math.pow(this.vertices[2][1] - this.vertices[0][1], 2));
    }

    calcWidth() {
        return Math.sqrt(Math.pow(this.vertices[1][0] - this.vertices[0][0], 2) + Math.pow(this.vertices[1][1] - this.vertices[0][1], 2));
    }
}

class Square extends Shape {
    constructor(vertices, colors, theta=0) {
        super("square", vertices, colors, theta);
    }

    center() {
        let x = (this.vertices[0][0] + this.vertices[3][0]) / 2;
        let y = (this.vertices[0][1] + this.vertices[3][1]) / 2;
        return [x, y];
    }

    calcSideLength() {
        return Math.sqrt(Math.pow(this.vertices[1][0] - this.vertices[0][0], 2) + Math.pow(this.vertices[1][1] - this.vertices[0][1], 2));
    }
}

class Polygon extends Shape {
    constructor(vertices, colors, theta=0) {
        super("polygon", vertices, colors, theta);
    }

    center() {
        let x = 0;
        let y = 0;
        for (let i=0; i<this.vertices.length; i++) {
            x += this.vertices[i][0];
            y += this.vertices[i][1];
        }
        x /= this.vertices.length;
        y /= this.vertices.length;
        return [x, y];
    }
}

class PolyStrip extends Shape {
    constructor(vertices, colors, theta=0) {
        super("poly-strip", vertices, colors, theta);
    }

    center() {
        let x = 0;
        let y = 0;
        for (let i=0; i<this.vertices.length; i++) {
            x += this.vertices[i][0];
            y += this.vertices[i][1];
        }
        x /= this.vertices.length;
        y /= this.vertices.length;
        return [x, y];
    }
}