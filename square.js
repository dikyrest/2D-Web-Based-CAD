square_button = document.getElementById("create-square");

square_button.addEventListener("click", function () {
    if (isOnCreate === "square") {
        isOnCreate = "";
        square_button.textContent = "Square";
        square_button.removeAttribute("style");
        enableAllButtons();
    } else {
        isOnCreate = "square";
        square_button.textContent = "Save";
        square_button.style.backgroundColor = "#808080";
        square_button.style.color = "#ffffff";
        disableButtonsExcept("create-square");
    }
});