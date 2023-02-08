const linebtn = document.getElementById('create-line');

linebtn.addEventListener('click', function() {
    if (isOnCreate) {
        isOnCreate = false;
        linebtn.textContent = 'Line';
        linebtn.removeAttribute('style');
        squarebtn.disabled = false;
        rectanglebtn.disabled = false;
        polygonbtn.disabled = false;
        polygonstripbtn.disabled = false;
    } else {
        isOnCreate = true;
        linebtn.textContent = 'Save';
        linebtn.style.backgroundColor = '#808080';
        linebtn.style.color = '#ffffff';
        squarebtn.disabled = true;
        rectanglebtn.disabled = true;
        polygonbtn.disabled = true;
        polygonstripbtn.disabled = true;
    }
});