const polygonstripbtn = document.getElementById('create-polygon-strip');

polygonstripbtn.addEventListener('click', function() {
    if (isOnCreatePolygonStrip) {
        isOnCreatePolygonStrip = false;
        polygonstripbtn.textContent = 'Polygon Strip';
        polygonstripbtn.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreatePolygonStrip = true;
        polygonstripbtn.textContent = 'Save';
        polygonstripbtn.style.backgroundColor = '#808080';
        polygonstripbtn.style.color = '#ffffff';
        disableButtonsExcept('create-polygon-strip');
    }
});