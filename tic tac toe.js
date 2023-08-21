// THEME SWITCH
const battleground = document.querySelector(".tic-tac-toe");
const background = document.querySelector(".wrapper");
const switchMode = () => {
  const modeIcon = document.querySelector("[mode-icon]");
  let classes = [...modeIcon.classList];
  if (classes.includes("fa-sun")) {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
    background.classList.remove("light");
    background.classList.add("dark");
    battleground.classList.remove("light-sup");
    battleground.classList.add("dark-sup");
  } else {
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
    background.classList.remove("dark");
    background.classList.add("light");
    battleground.classList.remove("dark-sup");
    battleground.classList.add("light-sup");
  }
};

// GAME MECHANISM
var winningPositions = [
	[0, 3, 6], 
	[1, 4, 7],
	[2, 5, 8],
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 4, 8],
	[2, 4, 6]
];
var blocksOcc = 0;
const initBtn = document.querySelector(".initGameBtn");
const boxes = document.getElementsByClassName("box");
var turn = "X";
var playGrid = [
					["", "", ""], 
					["", "", ""], 
					["", "", ""]    
									];
[...boxes].forEach((box, index) => {
	box.addEventListener("click", () => {
	clickHandler(index);
  });
});
function initGame(){
	const defaults = {
		spread: 360,
		ticks: 50,
		gravity: 0,
		decay: 0.94,
		startVelocity: 30,
		shapes: ["star"],
		colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
	  };
	  
	  function shoot() {
		confetti({
		  ...defaults,
		  particleCount: 40,
		  scalar: 1.2,
		  shapes: ["star"],
		});
	  
		confetti({
		  ...defaults,
		  particleCount: 10,
		  scalar: 0.75,
		  shapes: ["circle"],
		});
	  }
	  
	  setTimeout(shoot, 0);
	  setTimeout(shoot, 100);
	  setTimeout(shoot, 200);
	clearInterval(interval);
	blocksOcc = 0;
	turn = 'X';
	playGrid.forEach(row => {
		row.forEach((elem, index)=>{
			row[index] = "";
		})
	});
	console.log("hello");
	console.log(playGrid);
	[...boxes].forEach((box) => {
		box.style.pointerEvents = "all";
		box.textContent = "";
		if([...box.classList].includes("win"))
			box.classList.remove("win");
	});
	initBtn.classList.remove("active");
	initBtn.classList.add("inactive");
}
function clickHandler(index) {
    console.log(index);
    if(playGrid[Math.floor(index/3)][index%3] == "")
    {
        boxes[index].textContent = turn;
        playGrid[Math.floor(index/3)][index%3] = turn;
		boxes[index].style.pointerEvents = "none";
		blocksOcc += 1;
        if(!isGameOver())
            turn = (turn == "X") ? "O" : "X";
    }
	console.log(playGrid);
}
function isGameOver(){
	if(blocksOcc > 4)
	{
		winningPositions.forEach((position)=>{
			if(playGrid[Math.floor(position[0]/3)][position[0]%3] == playGrid[Math.floor(position[1]/3)][position[1]%3] 
			 && playGrid[Math.floor(position[1]/3)][position[1]%3]  == playGrid[Math.floor(position[2]/3)][position[2]%3])
			{
				if(playGrid[Math.floor(position[0]/3)][position[0]%3] != "")
				{
					endGame(position[0], position[1], position[2]);
					celebrate();
					return true;
				}
			}
		});
	}
	if(blocksOcc == 9)
		endGame();
	return false;
}
function endGame(ind1 = -1, ind2 = -1, ind3 = -1)
{
	[...boxes].forEach((box)=>{
		box.style.pointerEvents = "none";
	});
	if(ind1 != -1 && ind2 != -1 && ind3 != -1)
	{
		boxes[ind1].classList.add("win");
		boxes[ind2].classList.add("win");
		boxes[ind3].classList.add("win");
	}
	initBtn.classList.remove("inactive");
	initBtn.classList.add("active");
}
function celebrate(){
	const duration = 15 * 1000,
	animationEnd = Date.now() + duration,
	defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
  function randomInRange(min, max) {
	return Math.random() * (max - min) + min;
  }
    interval = setInterval(function() {
	const timeLeft = animationEnd - Date.now();
  
	if (timeLeft <= 0) {
	  return clearInterval(interval);
	}
  
	const particleCount = 50 * (timeLeft / duration);
	confetti(
	  Object.assign({}, defaults, {
		particleCount,
		origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
	  })
	);
	confetti(
	  Object.assign({}, defaults, {
		particleCount,
		origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
	  })
	);
  }, 250);
}
var interval;
initGame();
