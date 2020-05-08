let fileNames = document.querySelectorAll("section .file-name");

for(let i = 0; i < fileNames.length; i++){
    fileNames[i].addEventListener('click', function(e) {
        ajaxPostRequest(fileNames[i].innerText);
    });
}

function ajaxPostRequest(fileName) {
    window.location.replace("/viewer?data=" + fileName);
}