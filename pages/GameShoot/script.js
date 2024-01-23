let currentName = null
let playerName = '';
let score  = 0;       //Итог
let stepCounter = 0   //Кол-шагов (для настоящего итога)
let target = 0        //Целевое значение
let currentScore = 0  //Текущее значение

let complexity = 1;   //Сложность 0 - легко, 1 - средне, 2 - сложно

let timingValue = 2000;

let objectHolder = [];
let obj = null;


document.addEventListener("DOMContentLoaded", init());

document.addEventListener("keydown", function(event) {
  const line = document.getElementById("movableLine");
  const step = 10; 
  const gameWindow = document.getElementById("gameWindow");
  const gameWindowRect = gameWindow.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect();
  if (event.code === "Space") 
  {
    event.preventDefault();  
    onSpace()
  }

   if (event.key === "ArrowLeft" && lineRect.left - step >= gameWindowRect.left) {
    line.style.left = `${lineRect.left - step}px`;
  } else if (event.key === "ArrowRight" && lineRect.right + step <= gameWindowRect.right) {
    line.style.left = `${lineRect.left + step}px`;
  }
});

function createObject(){
  const object = document.createElement("div");
  object.className = "falling-object";
  object.textContent = getRandomInteger(1, 10)
  return object
}


function savePlayerResults(name,score)    //Сохранение результатов
{
  let listOfPlayers = JSON.parse(localStorage.getItem('listOfPlayers'))
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
}

// const timerDuration = 60000; // 1 минута
let timer = null;

function onSpace()
{

      const fallingObject = objectHolder.shift();
      objectHolder.push(createObject())
      obj.appendChild(objectHolder[objectHolder.length - 1])
      fallingObject.className = 'falling-object';
      fallingObject.style.animation = "flyAnimation 2s linear forwards"; 
      fallingObject.style.position = "absolute";

      const line = document.getElementById('movableLine'); 
      const lineRect = line.getBoundingClientRect();
      const lineCenter = lineRect.left + 40 ;

      fallingObject.style.left = `${lineCenter}px`;
      gameWindow.appendChild(fallingObject);
      fallingObject.addEventListener("animationend", function () {
        gameWindow.removeChild(fallingObject);
      });

}

// function startTimer() {
//   const startTime = Date.now();

//   timer = setInterval(() => {

//     const elapsedTime = Date.now() - startTime;
//     const remainingTime = timerDuration - elapsedTime;

//     const timerElement = document.getElementById("timerElement");
//     timerElement.textContent = formatTime(remainingTime);

//     if (remainingTime <= 0) {
//       clearInterval(timer);
//       timerElement.textContent = "Timer expired";
//       finishGame();
//     }
//   }, 1000); 
// }

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
startTimer();

function getRandomInteger(min, max) {                               //Получение рандомных значений
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


function onObjectCatch(object)
{
 
}

function finishGame()
{
  savePlayerResults(currentName, score);
  window.location.href = "../Rating/index.html";

}

function init()
{
  obj = document.getElementById("objectContainer");

  const targ = document.getElementById("targetScore")
  complexity = JSON.parse(localStorage.getItem('currentComplexity'))
  if (complexity === null) {
    complexity = 3
  }
  currentName = JSON.parse(localStorage.getItem('currentName'))

  const nad = document.getElementById("playerName")
  nad.textContent = "Игрок: " + currentName;

  
  for(var i = 0; i < 5;i++)
  {
    objectHolder.push(createObject())
    obj.appendChild(objectHolder[i])
  }

  
}

  document.addEventListener("keydown", handleKeyPress);