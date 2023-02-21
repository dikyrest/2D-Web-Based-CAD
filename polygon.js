const polygon_button = document.getElementById('create-polygon');

polygon_button.addEventListener('click', function() {
    if (isOnCreate === "polygon") {
        isOnCreate = "";
        polygon_button.textContent = 'Polygon';
        if ( isConvexHull ) {
            makePolygonWithConvexHull()
        }
        disableButtonConvexHull();
        enableAllButtons();
    } else {
        isOnCreate = "polygon";
        polygonVertexCount = 0;
        polygon_button.textContent = 'Save';
        disableButtonsExcept('create-polygon');
        enableButtonConvexHull();
    }
});

convexHull_button.addEventListener('click', function() {
    if (!isConvexHull) {
        isConvexHull = true
        alert('Menerapkan convex hull')
    } else {
        isConvexHull = false
        alert('Tidak menerapkan conex hull')
    }
})

function makePolygon(x, y) {
    if (polygonVertexCount === 0) {
        let vertices = [[x, y]];
        let colors = [[0,0,0,1]];

        let polygon = new Polygon(vertices, colors);
        allShapes.push(polygon);
    } else {
        allShapes[allShapes.length-1].vertices.push([x, y]);
        allShapes[allShapes.length-1].colors.push([0,0,0,1]);
    }
    polygonVertexCount++;
}

function resizePolygon(indexes, x, y) {
    let shapeIndex = indexes[0];
    let vertexIndex = indexes[1];

    allShapes[shapeIndex].vertices[vertexIndex][0] = x;
    allShapes[shapeIndex].vertices[vertexIndex][1] = y;
}

function movePolygon(index, x, y) {
    let dx = x - allShapes[index].center()[0];
    let dy = y - allShapes[index].center()[1];
    allShapes[index].move(dx, dy);
}

function makePolygonWithConvexHull() {
    let l, p, q, n, points, hullVertices, hullColors;

    // Find the leftmost point
    l = 0
    points = allShapes[allShapes.length-1].vertices
    colors = allShapes[allShapes.length-1].colors
    n = points.length
    for (let i = 1 ; i < n ; i++) {
        if ( points[i][0] < points[l][0] ) {
            l = i
        }
    }

    // Start from leftmost point, keep moving counterclockwise until reach the start point again.
    p = l;
    hullVertices = [];
    hullColors = [];

    do {
        // Add current point to result
        hullVertices.push(points[p]);
        hullColors.push(colors[p]);

        // Search for a point 'q' such that orientation(p, q, x) is counterclockwise for all points 'x'. The idea is to keep track of last visited most counterclock-wise point in q. If any point 'i' is more counterclock-wise than q, then update q.
        q = (p + 1) % n 

        for ( let i = 0 ; i < n ; i++ ) {
            // If i is more counterclockwise than current q, then update q
            if (pointOrientation(points[p], points[i], points[q]) == 2) {
                q = i
            }
        }
        // Now q is the most counterclockwise with respect to p. Set p as q for next iteration, so that q is added to result 'hullVertices'
        p = q
    } while ( p != l ) // While we don't come to first point

    let polygon = new Polygon(hullVertices, hullColors)
    allShapes[allShapes.length-1] = polygon
}