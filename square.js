square_button = document.getElementById("create-square");

square_button.addEventListener("click", function () {
    if (isOnCreate === "square") {
        isOnCreate = "";
        square_button.textContent = "Square";
        enableAllButtons();
    } else {
        isOnCreate = "square";
        square_button.textContent = "Save";
        disableButtonsExcept("create-square");
    }
});