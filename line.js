const linebtn = document.getElementById('create-line');

linebtn.addEventListener('click', function() {
    if (isOnCreate === "line") {
        isOnCreate = "";
        linebtn.textContent = 'Line';
        linebtn.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreate = "line";
        linebtn.textContent = 'Save';
        linebtn.style.backgroundColor = '#808080';
        linebtn.style.color = '#ffffff';
        disableButtonsExcept('create-line');
    }
});