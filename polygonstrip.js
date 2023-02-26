const poly_strip_button = document.getElementById('create-polygon-strip');

poly_strip_button.addEventListener('click', function() {
    if (isOnCreate === "poly-strip") {
        isOnCreate = "";
        poly_strip_button.textContent = 'Polygon Strip';
        if ( isConvexHull ) {
            makePolygonStripStripWithConvexHull()
        }
        enableAllButtons();
        convexHull_button.disabled = true;
    } else {
        isOnCreate = "poly-strip";
        polyStripVertexCount = 0;
        poly_strip_button.textContent = 'Save';
        disableButtonsExcept('create-polygon-strip');
        convexHull_button.disabled = false;
    }
});

function makePolyStrip(x, y) {
    if (polyStripVertexCount === 0) {
        let vertices = [[x, y]];
        let colors = [[0,0,0,1]];

        let polyStrip = new PolyStrip(vertices, colors);
        allShapes.push(polyStrip);
    } else {
        allShapes[allShapes.length-1].vertices.push([x, y]);
        allShapes[allShapes.length-1].colors.push([0,0,0,1]);
    }
    polyStripVertexCount++;
}

function resizePolyStrip(indexes, x, y) {
    let shapeIndex = indexes[0];
    let vertexIndex = indexes[1];

    allShapes[shapeIndex].vertices[vertexIndex][0] = x;
    allShapes[shapeIndex].vertices[vertexIndex][1] = y;
}

function movePolyStrip(index, x, y) {
    let dx = x - allShapes[index].center()[0];
    let dy = y - allShapes[index].center()[1];
    allShapes[index].move(dx, dy);
}

function makePolygonStripStripWithConvexHull() {
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
            if (pointOrientation(points[p], points[i], points[q]) === 2) {
                q = i
            }
        }
        // Now q is the most counterclockwise with respect to p. Set p as q for next iteration, so that q is added to result 'hullVertices'
        p = q
    } while ( p !== l ) // While we don't come to first point

    allShapes[allShapes.length-1] = new Polygon(hullVertices, hullColors)
}