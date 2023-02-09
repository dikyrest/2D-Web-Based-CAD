const polygonbtn = document.getElementById('create-polygon');

polygonbtn.addEventListener('click', function() {
    if (isOnCreatePolygon) {
        isOnCreatePolygon = false;
        polygonbtn.textContent = 'Polygon';
        polygonbtn.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreatePolygon = true;
        polygonbtn.textContent = 'Save';
        polygonbtn.style.backgroundColor = '#808080';
        polygonbtn.style.color = '#ffffff';
        disableButtonsExcept('create-polygon');
    }
});