class Shape {
    constructor(type, vertices, colors) {
        this.id = allShapes.length;
        this.type = type;
        this.theta = 0;
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

class Rectangle extends Shape {
    constructor(vertices, colors) {
        super("rectangle", vertices, colors);
    }

    center() {
        let x = (this.vertices[0][0] + this.vertices[3][0]) / 2;
        let y = (this.vertices[0][1] + this.vertices[3][1]) / 2;
        return [x, y];
    }
}

class Square extends Shape {
    constructor(vertices, colors) {
        super("square", vertices, colors);
    }

    center() {
        let x = (this.vertices[0][0] + this.vertices[3][0]) / 2;
        let y = (this.vertices[0][1] + this.vertices[3][1]) / 2;
        return [x, y];
    }
}

class Line extends Shape {
    constructor(vertices, colors) {
        super("line", vertices, colors);
    }

    center() {
        let x = (this.vertices[0][0] + this.vertices[1][0]) / 2;
        let y = (this.vertices[0][1] + this.vertices[1][1]) / 2;
        return [x, y];
    }
}

class Polygon extends Shape {
    constructor(vertices, colors) {
        super("polygon", vertices, colors);
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
    constructor(vertices, colors) {
        super("poly-strip", vertices, colors);
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