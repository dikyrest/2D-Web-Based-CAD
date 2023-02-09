const polygonstripbtn = document.getElementById('create-polygon-strip');

polygonstripbtn.addEventListener('click', function() {
    if (isOnCreate === "poly-strip") {
        isOnCreate = "";
        polygonstripbtn.textContent = 'Polygon Strip';
        polygonstripbtn.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreate = "poly-strip";
        polygonstripbtn.textContent = 'Save';
        polygonstripbtn.style.backgroundColor = '#808080';
        polygonstripbtn.style.color = '#ffffff';
        disableButtonsExcept('create-polygon-strip');
    }
});