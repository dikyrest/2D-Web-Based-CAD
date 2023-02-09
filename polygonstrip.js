const polygonstripbtn = document.getElementById('create-polygon-strip');

polygonstripbtn.addEventListener('click', function() {
    if (isOnCreate === "poly-strip") {
        isOnCreate = "";
        polygonstripbtn.textContent = 'Polygon Strip';
        polygonstripbtn.removeAttribute('style');
        linebtn.disabled = false;
        squarebtn.disabled = false;
        rectanglebtn.disabled = false;
        polygonbtn.disabled = false;
    } else {
        isOnCreate = "poly-strip";
        polygonstripbtn.textContent = 'Save';
        polygonstripbtn.style.backgroundColor = '#808080';
        polygonstripbtn.style.color = '#ffffff';
        linebtn.disabled = true;
        squarebtn.disabled = true;
        rectanglebtn.disabled = true;
        polygonbtn.disabled = true;
    }
});