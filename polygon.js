const polygon_button = document.getElementById('create-polygon');

polygon_button.addEventListener('click', function() {
    if (isOnCreate === "polygon") {
        isOnCreate = "";
        polygon_button.textContent = 'Polygon';
        polygon_button.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreate = "polygon";
        polygon_button.textContent = 'Save';
        polygon_button.style.backgroundColor = '#808080';
        polygon_button.style.color = '#ffffff';
        disableButtonsExcept('create-polygon');
    }
});