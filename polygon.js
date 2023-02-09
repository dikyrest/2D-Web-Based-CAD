const polygonbtn = document.getElementById('create-polygon');

polygonbtn.addEventListener('click', function() {
    if (isOnCreate === "polygon") {
        isOnCreate = "";
        polygonbtn.textContent = 'Polygon';
        polygonbtn.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreate = "polygon";
        polygonbtn.textContent = 'Save';
        polygonbtn.style.backgroundColor = '#808080';
        polygonbtn.style.color = '#ffffff';
        disableButtonsExcept('create-polygon');
    }
});