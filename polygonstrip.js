const poly_strip_button = document.getElementById('create-polygon-strip');

poly_strip_button.addEventListener('click', function() {
    if (isOnCreate === "poly-strip") {
        isOnCreate = "";
        poly_strip_button.textContent = 'Polygon Strip';
        poly_strip_button.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreate = "poly-strip";
        poly_strip_button.textContent = 'Save';
        poly_strip_button.style.backgroundColor = '#808080';
        poly_strip_button.style.color = '#ffffff';
        disableButtonsExcept('create-polygon-strip');
    }
});