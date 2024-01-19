let currentName = null
let playerName = '';
let score  = 0;       //Итог
let stepCounter = 0   //Кол-шагов (для настоящего итога)
let target = 0        //Целевое значение
let currentScore = 0  //Текущее значение

let complexity = 1;   //Сложность 0 - легко, 1 - средне, 2 - сложно

let timingValue = 2000;

document.addEventListener("DOMContentLoaded", init());

function createFallingObject() {
    const gameWindow = document.getElementById("gameWindow");
    const object = document.createElement("div");
    object.className = "falling-object";
    switch (complexity)
    {
      case 0:
        object.textContent = getRandomInteger(1, 10) 
        break
      case 1:
        object.textContent = getRandomInteger(1, 10) 
        break;
      case 2:
        object.textContent = getRandomFloat(1, 10,2) 
        break;
      default:
        object.textContent = "err";
        break;
    }

    // Calculate left position relative to gameWindow width
    const gameWindowWidth = gameWindow.offsetWidth;
    const randomLeft = Math.random() * 100;
    const objectLeft = (randomLeft / 100) * (gameWindowWidth-70) + "px";  //-70, чтобы не падали за рамку
    object.style.left = objectLeft;
    
    gameWindow.appendChild(object);
  
    // Add click event listener to the object
    object.addEventListener("click", function () {
      onObjectCatch(object)
      gameWindow.removeChild(object);
    });
  
    // Add animationend event listener to remove the object after animation finishes
    object.addEventListener("animationend", function () {
      gameWindow.removeChild(object);
    });
  }


  setInterval(createFallingObject, timingValue);    //Создание объектов по таймеру


  function getInfoFromLocaleStorage() {
    let listOfPlayers = JSON.parse(localStorage.getItem('listOfPlayers'))
    let nameFromLS = JSON.parse(localStorage.getItem('playerName'))

}
function savePlayerResults(name,score)
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

const timerDuration = 60000; // 1 минута
let timer = null;

// Start the timer
function startTimer() {
  const startTime = Date.now();

  timer = setInterval(() => {
    // Calculate remaining time
    const elapsedTime = Date.now() - startTime;
    const remainingTime = timerDuration - elapsedTime;

    // Update the timer element with the remaining time
    const timerElement = document.getElementById("timerElement");
    timerElement.textContent = formatTime(remainingTime);

    // Check if the timer has expired
    if (remainingTime <= 0) {
      clearInterval(timer);
      timerElement.textContent = "Timer expired";
      // Redirect to another page when the timer expires
      // window.location.href = "https://example.com/another-page";
      finishGame();
    }
  }, 1000); // Update every second
}

// Utility function to format time in "mm:ss" format
function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
// startTimer();

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function getRandomFloat(min, max, decimals) {
const randomNum = Math.random() * (max - min) + min;
return randomNum.toFixed(decimals);
}
  
// Handle Space key press events
function handleKeyPress(event) {
    if (event.code === "Space") {
        event.preventDefault();     //Чтобы не прокручивалось
      const catchLine = document.querySelector(".catch-line");
      const fallingObjects = document.getElementsByClassName("falling-object");
  
      const catchLineTop = catchLine.offsetTop;
      const catchLineBottom = catchLine.offsetTop + catchLine.offsetHeight;
  
      Array.from(fallingObjects).forEach((object) => {
        const objectTop = object.offsetTop;
        const objectBottom = object.offsetTop + object.offsetHeight;
  
        if (objectTop >= catchLineTop && objectBottom <= catchLineBottom) {
          onObjectCatch(object)
          object.remove();
        }
      });
    }
  }

function onObjectCatch(object)
{
  stepCounter++
  currentScore += (parseFloat(object.textContent))
  currentScore = parseFloat(currentScore.toFixed(2))
  console.log(currentScore,stepCounter,target)
  if (currentScore >= target)
    finishGame()
}

function finishGame()
{
  if ( currentScore==target )
  {
      let presumableScore = 100 - stepCounter * 5;
      score = presumableScore > 0 ? presumableScore : 0;
  }
  else 
    score=0;

  savePlayerResults(currentName,score)

}

function init()
{
  switch (complexity)
  {
    case 0:
      target = getRandomInteger(90,120)
      timingValue = 2000;
      break
    case 1:
      target = getRandomInteger(120,150)
      timingValue = 1000
      break;
    case 2:
      target = getRandomFloat(120,150,2)
      timingValue = 800;
      break;
    default:
      target = 0;
      break;
  }
}
  document.addEventListener("keydown", handleKeyPress);