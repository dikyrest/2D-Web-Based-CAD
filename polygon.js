const polygonbtn = document.getElementById('create-polygon');

polygonbtn.addEventListener('click', function() {
    if (isOnCreate === "polygon") {
        isOnCreate = "";
        polygonbtn.textContent = 'Polygon';
        polygonbtn.removeAttribute('style');
        linebtn.disabled = false;
        squarebtn.disabled = false;
        rectanglebtn.disabled = false;
        polygonstripbtn.disabled = false;
    } else {
        isOnCreate = "polygon";
        polygonbtn.textContent = 'Save';
        polygonbtn.style.backgroundColor = '#808080';
        polygonbtn.style.color = '#ffffff';
        linebtn.disabled = true;
        squarebtn.disabled = true;
        rectanglebtn.disabled = true;
        polygonstripbtn.disabled = true;
    }
});