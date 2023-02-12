const export_button = document.getElementById('export');

export_button.addEventListener('click', function() {
    var nameFile = document.getElementById('filename').value;
    if (nameFile.trim() === "") {
        alert('Enter a file name and make sure the file name does not contain only spaces!')
    } else {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(allShapes)], {type : "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = nameFile.split(' ').join('_') + ".txt";
        a.click();
    }
});