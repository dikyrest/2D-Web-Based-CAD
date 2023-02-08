const rectanglebtn = document.getElementById('create-rectangle');

rectanglebtn.addEventListener('click', function() {
    if (isOnCreate) {
        isOnCreate = false;
        rectanglebtn.textContent = 'Rectangle';
        rectanglebtn.removeAttribute('style');
        linebtn.disabled = false;
        squarebtn.disabled = false;
        polygonbtn.disabled = false;
        polygonstripbtn.disabled = false;
    } else {
        isOnCreate = true;
        rectanglebtn.textContent = 'Save';
        rectanglebtn.style.backgroundColor = '#808080';
        rectanglebtn.style.color = '#ffffff';
        linebtn.disabled = true;
        squarebtn.disabled = true;
        polygonbtn.disabled = true;
        polygonstripbtn.disabled = true;
    }
});