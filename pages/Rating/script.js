window.onload = getInfoFromLocaleStorage();


function getInfoFromLocaleStorage() {
    let listOfPlayers = JSON.parse(localStorage.getItem('listOfPlayers'));

    if (listOfPlayers) {
        //Сортировка по убыванию
        listOfPlayers.sort((a, b) => b.score - a.score);

        const playerScoreTableBody = document.querySelector('#player-score-table tbody');
        playerScoreTableBody.innerHTML = '';

        for (const player of listOfPlayers) {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const scoreCell = document.createElement('td');

            nameCell.innerText = player.name;
            scoreCell.innerText = player.score;

            row.appendChild(nameCell);
            row.appendChild(scoreCell);

            playerScoreTableBody.appendChild(row);
        }
    }
}
