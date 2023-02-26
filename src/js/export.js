const export_button = document.getElementById('export');

export_button.addEventListener('click', function() {
    const nameFile = document.getElementById('filename').value;
    if (nameFile.trim() === "") {
        alert('Enter a file name and make sure the file name does not contain only spaces!')
    } else {
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(allShapes)], {type : "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = nameFile.split(' ').join('_') + ".txt";
        a.click();
    }
});