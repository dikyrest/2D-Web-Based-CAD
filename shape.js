class Shape {
    constructor(type, vertices, colors) {
        this.id = allShapes.length;
        this.type = type;
        this.vertices = vertices;
        this.colors = colors;
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