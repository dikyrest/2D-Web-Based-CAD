const linebtn = document.getElementById('create-line');

linebtn.addEventListener('click', function() {
    if (isOnCreateLine) {
        isOnCreateLine = false;
        linebtn.textContent = 'Line';
        linebtn.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreateLine = true;
        linebtn.textContent = 'Save';
        linebtn.style.backgroundColor = '#808080';
        linebtn.style.color = '#ffffff';
        disableButtonsExcept('create-line');
    }
});