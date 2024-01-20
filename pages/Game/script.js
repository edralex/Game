let currentName = null
let playerName = '';
let score  = 0;       //Итог
let stepCounter = 0   //Кол-шагов (для настоящего итога)
let target = 0        //Целевое значение
let currentScore = 0  //Текущее значение

let complexity = 1;   //Сложность 0 - легко, 1 - средне, 2 - сложно

let timingValue = 2000;

let firstHard = 0
let secondHard = 0
let thirdHard = 0
let cnt = 0;

document.addEventListener("DOMContentLoaded", init());

function createFallingObject() {
  const gameWindow = document.getElementById("gameWindow");
  const object = document.createElement("div");
  object.className = "falling-object";
  switch (complexity)
  {
    case 0:
      object.textContent = getRandomInteger(1, 10) 
      object.style.animation = "fallAnimation 2s linear forwards";
      break
    case 1:
      object.textContent = getRandomInteger(1, 10) 
      object.style.animation = "flyAnimation 2s linear forwards";
      break;
    case 2:
      object.textContent = getRandomInteger(1, 10) 
      object.style.animation = "weaveAnimation 4s linear forwards";
      break;
    default:
      object.textContent = "err";
      break;
  }

  const gameWindowWidth = gameWindow.offsetWidth;
  const randomLeft = Math.random() * 100;
  const objectLeft = (randomLeft / 100) * (gameWindowWidth-70) + "px";  //-70, чтобы не падали за рамку
  object.style.left = objectLeft;

  gameWindow.appendChild(object);


  object.addEventListener("click", function () {
    onObjectCatch(object)
    gameWindow.removeChild(object);
  });

  object.addEventListener("animationend", function () {
    gameWindow.removeChild(object);
  });
}


setInterval(createFallingObject, timingValue);    //Создание объектов по таймеру


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

const timerDuration = 60000; // 1 минута
let timer = null;


function startTimer() {
  const startTime = Date.now();

  timer = setInterval(() => {

    const elapsedTime = Date.now() - startTime;
    const remainingTime = timerDuration - elapsedTime;

    const timerElement = document.getElementById("timerElement");
    timerElement.textContent = formatTime(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(timer);
      timerElement.textContent = "Timer expired";
      finishGame();
    }
  }, 1000); 
}

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
startTimer();

function getRandomInteger(min, max) {                               //Получение рандомных значений
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function getRandomFloat(min, max, decimals) {
const randomNum = Math.random() * (max - min) + min;
return randomNum.toFixed(decimals);
}
  

function handleKeyPress(event) {
    if (event.code === "Space") {
        event.preventDefault();     //Чтобы не прокручивалось
      const catchLine = document.querySelector(".catch-line");                //catchline - зеленая линия
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
  let catchedNumber = (parseFloat(object.textContent))
  const targ = document.getElementById("targetScore")

  switch (complexity)
  {
    case 0:
      {
        currentScore += catchedNumber
        currentScore = parseFloat(currentScore.toFixed(2))      //Дважды парс потому что 0.0000000001
        const scorec = document.getElementById("currentScore")
        scorec.textContent ="Текущее число: " + currentScore;
      }
      break;
      case 1:
        {
          if (catchedNumber % 2 ==1)
          {
            finishGame();
          }
          currentScore += catchedNumber
          currentScore = parseFloat(currentScore.toFixed(2))      //Дважды парс потому что 0.0000000001
          const scorece = document.getElementById("currentScore")
          scorece.textContent ="Текущее число: " + currentScore;
        }
        break;
        case 2:
          {
            switch (cnt)
            {
              case 0:
                firstHard = catchedNumber
                cnt++
                break;
              case 1:
                secondHard = catchedNumber
                cnt++
                break;
              case 2:
                {
                thirdHard = catchedNumber
                let result = firstHard - secondHard - thirdHard;
                firstHard=0
                secondHard=0
                thirdHard=0
                cnt=0
                if (result ==0)
                currentScore++
                targ.textContent="Очки: " + currentScore;
                }
                break;
            }
            const scorecec = document.getElementById("currentScore")
            scorecec.textContent = firstHard + "=" + secondHard + "+" + thirdHard;            
          }
          break;
  }
  if (currentScore >= target || isNaN(currentScore))
    finishGame()
}

function finishGame()
{
  if ( currentScore==target )
  {
      let presumableScore = 200 - stepCounter * 5;
      score = presumableScore > 0 ? presumableScore : 0;
  }
  else 
    score=0;
  if (complexity==2)
  {
    score = currentScore * 10;
  }
  savePlayerResults(currentName,score);
  window.location.href = "../Rating/index.html";

}

function init()
{
  const targ = document.getElementById("targetScore")
  complexity = JSON.parse(localStorage.getItem('currentComplexity'))
  if (complexity === null) {
    complexity = 3
  }
  currentName = JSON.parse(localStorage.getItem('currentName'))
  const nad = document.getElementById("playerName")
  nad.textContent="Игрок: " + currentName;

  switch (complexity)
  {
    case 0:
      target = getRandomInteger(90,120)
      timingValue = 2000;
      targ.textContent="Целевое число: " + target;
      break
    case 1:
      let temp = getRandomInteger(60, 75);
      target = temp * 2;
      timingValue = 1000;
      const scorece = document.getElementById("explainer")
      scorece.textContent ="ТОЛЬКО ЧЕТНЫЕ";
      targ.textContent="Целевое число: " + target;
      break
    case 2:
      target = 30;
      timingValue = 1400;
      const scorecec = document.getElementById("explainer")
      scorecec.textContent ="Сумма из 3, первое число - итог, второе и третье число - слагаемые";
      targ.textContent="Очки: " + 0;
      break;
    default:
      target = 0;
      break;
  }

  console.log("inited")
    
  
}
  document.addEventListener("keydown", handleKeyPress);