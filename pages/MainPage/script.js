function saveName() {
    const textFromInput = document.querySelector('.input_text').value.trim()
    if (textFromInput === '') {
        currentName = 'Безымянный игрок';
        return;
    }
    localStorage.setItem('currentName', JSON.stringify(textFromInput)) 
}

function setComplexity(compl)
{
    localStorage.setItem('currentComplexity', JSON.stringify(compl))
}

document.getElementById("ratingButton").addEventListener("click", function() {
    window.location.href = "../Rating/index.html";  });

document.getElementById("startButton").addEventListener("click", function() {
    saveName()
window.location.href = "../Game/index.html";  });