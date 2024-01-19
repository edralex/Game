let currentName = null
let playerName = '';
let score    = 0;

window.onload = function() {
    const playerScoreTableBody = document.querySelector('#player-score-table tbody');

    // Example entries
    const players = [
        { name: 'Player1', score: 100 },
        { name: 'Player2', score: 200 },
        { name: 'Player3', score: 300 },
        { name: 'Player4', score: 228 },
        { name: 'Player1', score: 100 },
        { name: 'Player2', score: 200 },
        { name: 'Player3', score: 300 },
        { name: 'Player1', score: 100 },
        { name: 'Player2', score: 200 },
        { name: 'Player3', score: 300 },
        { name: 'Player1', score: 100 },
        { name: 'Player2', score: 200 },
        { name: 'Player3', score: 300 },
        { name: 'Player1', score: 100 },
        { name: 'Player2', score: 200 },
        { name: 'Player3', score: 300 }
        
    ];

    players.forEach(player => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const scoreCell = document.createElement('td');

        nameCell.innerText = player.name;
        scoreCell.innerText = player.score;

        row.appendChild(nameCell);
        row.appendChild(scoreCell);

        playerScoreTableBody.appendChild(row);
    });
};




function drawNameAndScore(name, score) {
    let listOfPlayers = JSON.parse(localStorage.getItem('listOfPlayers'))

    if (!name) {
        alert('Please enter your name')
        return;
    }

    if (listOfPlayers === null) {
        listOfPlayers = []
    }
    let player = listOfPlayers.find(value => value.name === name)
    if (player) {
        player.score = score > player.score ? score : player.score
    } else {
        listOfPlayers.push({name, score})
    }
    localStorage.setItem('listOfPlayers', JSON.stringify(listOfPlayers))
    localStorage.setItem('playerName', JSON.stringify(name))
    getInfoFromLocaleStorage();
}

function getInfoFromLocaleStorage() {
    let listOfPlayers = JSON.parse(localStorage.getItem('listOfPlayers'))
    let nameFromLS = JSON.parse(localStorage.getItem('playerName'))

    const list_of_name = document.querySelector('.list_of_name')
    const nameSpan = document.querySelectorAll('.player_name')
    const scoreSpan = document.querySelectorAll('.score')

    if (nameFromLS) {
        const textFromInput = document.querySelector('.input_text')
        textFromInput.value = nameFromLS
        currentName = nameFromLS
    }

    for (let i = 1; i < nameSpan.length; i++) {
        nameSpan[i].remove()
    }
    for (let i = 1; i < scoreSpan.length; i++) {
        scoreSpan[i].remove()
    }

    if (listOfPlayers === null) {
        return;
    }
    for (const player of listOfPlayers) {
        const name = document.createElement('span')
        name.className = 'player_name'
        const score = document.createElement('span')
        score.className = 'score'
        name.innerText = player.name;
        score.innerText = player.score;

        list_of_name.appendChild(name)
        list_of_name.appendChild(score)
    }
}
function saveName() {
    const textFromInput = document.querySelector('.input_text').value.trim()
    if (textFromInput === '') {
        currentName = 'Безымянный игрок';
        return;
    }
    currentName = textFromInput
    drawNameAndScore(textFromInput, score)
}