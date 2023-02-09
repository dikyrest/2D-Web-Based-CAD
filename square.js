squarebtn = document.getElementById("create-square");

squarebtn.addEventListener("click", function () {
    if (isOnCreate === "square") {
        isOnCreate = "";
        squarebtn.textContent = "Square";
        squarebtn.removeAttribute("style");
        linebtn.disabled = false;
        rectanglebtn.disabled = false;
        polygonbtn.disabled = false;
        polygonstripbtn.disabled = false;
    } else {
        isOnCreate = "square";
        squarebtn.textContent = "Save";
        squarebtn.style.backgroundColor = "#808080";
        squarebtn.style.color = "#ffffff";
        linebtn.disabled = true;
        rectanglebtn.disabled = true;
        polygonbtn.disabled = true;
        polygonstripbtn.disabled = true;
    }
});