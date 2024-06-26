const import_button = document.getElementById('import');

import_button.addEventListener('click', function() {
  const src = document.getElementById("filesource");

  if (src.files.length === 0) {
    alert('Tidak ada file yang dipilih!')
  } else {
    const reader = new FileReader();
    let data;
  
    reader.readAsText(src.files[0]);
    reader.onerror = () => {console.log("Load error")};
    reader.onload  = (e) => {
        data = (JSON.parse(e.target.result));
        console.log(data);
        for (let i = 0 ; i < data.length ; i++) {
          if (data[i].type === 'line') {
            let line = new Line(data[i].vertices, data[i].colors, data[i].theta);
            allShapes.push(line);
          } else if (data[i].type === 'rectangle') {
            let rectangle = new Rectangle(data[i].vertices, data[i].colors, data[i].theta);
            allShapes.push(rectangle);
          } else if (data[i].type === 'square') {
            let square = new Square(data[i].vertices, data[i].colors, data[i].theta);
            allShapes.push(square);
          } else if (data[i].type === 'polygon') {
            let polygon = new Polygon(data[i].vertices, data[i].colors, data[i].theta);
            allShapes.push(polygon);
          } else if (data[i].type === 'poly-strip') {
            let polyStrip = new PolyStrip(data[i].vertices, data[i].colors, data[i].theta);
            allShapes.push(polyStrip);
          }
        } 
    };
    alert('Import file berhasil!')
  }
});