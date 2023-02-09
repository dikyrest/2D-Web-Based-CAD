const line_button = document.getElementById('create-line');

line_button.addEventListener('click', function() {
    if (isOnCreate === "line") {
        isOnCreate = "";
        line_button.textContent = 'Line';
        line_button.removeAttribute('style');
        enableAllButtons();
    } else {
        isOnCreate = "line";
        line_button.textContent = 'Save';
        line_button.style.backgroundColor = '#808080';
        line_button.style.color = '#ffffff';
        disableButtonsExcept('create-line');
    }
});