squarebtn = document.getElementById("create-square");

squarebtn.addEventListener("click", function () {
    if (isOnCreate === "square") {
        isOnCreate = "";
        squarebtn.textContent = "Square";
        squarebtn.removeAttribute("style");
        enableAllButtons();
    } else {
        isOnCreate = "square";
        squarebtn.textContent = "Save";
        squarebtn.style.backgroundColor = "#808080";
        squarebtn.style.color = "#ffffff";
        disableButtonsExcept("create-square");
    }
});