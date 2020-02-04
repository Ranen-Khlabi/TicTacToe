// Create function for Music
var music = document.getElementById("music");
var isPlaying = false;
music.volume = 0.2;
function togglePlay() {
  if (isPlaying) {
    music.pause()
  } else {
    music.play();
  }
};
music.onplaying = function() {
  isPlaying = true;
  document.getElementById("music-animation").classList.add('on')
};
music.onpause = function() {
  isPlaying = false;
  document.getElementById("music-animation").classList.remove('on')
};

var button = document.getElementById("toggle");
button.addEventListener('click', function() {
  if (button.getAttribute("data-text-swap") == button.innerHTML) {
    button.innerHTML = button.getAttribute("data-text-original");
  } else {
    button.setAttribute("data-text-original", button.innerHTML);
    button.innerHTML = button.getAttribute("data-text-swap");
  }
}, false);



//Call ===> select all inside class ( cell )
const cells = Array.from(document.querySelectorAll(".cell"));
//Create Array for win
const winner =[
[1,2,3],
[4,5,6],
[7,8,9],
[1,5,9],
[3,5,7],
[1,4,7],
[2,5,8],
[3,6,9]
];

//Declar Varible
let firstPlayer = [];
let secondPlayer = [];
let count = 0;



//Start function
function check(array){
  let finalResult = false;
  //Create forLoop 
  for(let item of winner){
    let res = item.every(val => array.indexOf(val) !== -1);
    if(res){
      finalResult = true;
      break;
    }
  }
  return finalResult;
}

//Create function 
function winnerpleyr(p){
//Create the HTML element ===> "div"
  const modal = document.createElement("div");
//Create a Text Node with the specified text. 
  const player = document.createTextNode(p);
  const replay = document.createElement("button");
//returns
  modal.classList.add("winner");

  modal.appendChild(player);
  replay.appendChild(document.createTextNode("Replay"));
  // replay.setAttribute("onclick","rep();");
  replay.onclick = function() { 
    rep() 
  };
  modal.appendChild(replay);
  document.body.appendChild(modal);
}

//Create function 
function tie(){
  if(this.classList == "cell"){
    count++;
    if(count%2 !== 0){
      this.classList.add("x");
      firstPlayer.push(Number(this.dataset.index));
      if(check(firstPlayer)){        
        winnerpleyr("Congrats X Win :)");
        return true;
      }
    } else{
      this.classList.add("o");
      secondPlayer.push(Number(this.dataset.index));
      if(check(secondPlayer)){
        winnerpleyr("Congrats O Win :)");
        return true;
      }
    }
    if(count === 9){
      winnerpleyr("Tie :(");
    }
  }
}

function rep(){
  const win = document.querySelector(".winner");
  // cells
  firstPlayer = [];
  secondPlayer = [];
  count = 0;
  win.remove();
  [].forEach.call(cells, function(elem) {
    elem.classList.remove("x");
	  elem.classList.remove("o");
  });
}
 

cells.forEach(cell => cell.addEventListener("click", tie));