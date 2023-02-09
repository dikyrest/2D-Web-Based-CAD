squarebtn = document.getElementById("create-square");

squarebtn.addEventListener("click", function () {
    if (isOnCreateSquare) {
        isOnCreateSquare = false;
        squarebtn.textContent = "Square";
        squarebtn.removeAttribute("style");
        enableAllButtons();
    } else {
        isOnCreateSquare = true;
        squarebtn.textContent = "Save";
        squarebtn.style.backgroundColor = "#808080";
        squarebtn.style.color = "#ffffff";
        disableButtonsExcept("create-square");
    }
});