document.getElementsByClassName("upload-button").onchange = function() {
    document.getElementsByClassName("file-upload").submit();
};


let dropArea = document.querySelector("section .file-upload");
let inputArea = document.querySelector("section .upload-button");

dropArea.addEventListener('drop', function(e) {
    e.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', function(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    e.preventDefault();
    dropArea.classList.remove('highlight');

    document.querySelector(".upload-button").files = files;
    $(".loading-icon-spinner-ellipsis ").fadeIn();
    dropArea.submit();
});

function submitFormOnCnahge() {
    $(".loading-icon-spinner-ellipsis ").fadeIn();
    dropArea.submit();
}