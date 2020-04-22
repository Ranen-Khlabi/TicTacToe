let music = document.getElementById("music");
let isPlaying = false;
music.volume = 0.2;


// Create function for Music play
function togglePlay() {
  if (isPlaying) {
    music.pause()
  } else {
    music.play();
  }
};


//Take 'music' function if play ===> add 'on'
music.onplaying = function() {
  isPlaying = true;
  document.getElementById("music-animation").classList.add('on')
};
//Take 'music' function if pause ===> remove 'on'
music.onpause = function() {
  isPlaying = false;
  document.getElementById("music-animation").classList.remove('on')
};

//Create 'button' to swap between on & of
let button = document.getElementById("toggle");
button.addEventListener('click', function() {
  if (button.getAttribute("data-text-swap") == button.innerHTML) {
    button.innerHTML = button.getAttribute("data-text-original");
  } else {
    button.setAttribute("data-text-original", button.innerHTML);
    button.innerHTML = button.getAttribute("data-text-swap");
  }
}, false);


//*************************************************************************//



//Call ===> select all inside class ( cell )
const cells = Array.from(document.querySelectorAll(".cell"));

//Create Array for winner
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

//Declar Varible for player
let firstPlayer = [];
let secondPlayer = [];
let count = 0;


//Start function
function check(array){
  let finalResult = false;
  //Create for Loop 
  for(let item of winner){
    let res = item.every(val => array.indexOf(val) !== -1);
    if(res){
      finalResult = true;
      break;
    }
  }
  return finalResult;
}



//*************************************************************************//


//Create function for bottun if win, lose or tie 
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
    location.reload();
  };
  modal.appendChild(replay);
  document.body.appendChild(modal);
}


//*************************************************************************//



//Create function 
function tie(){
//Add sound when click " X "
  let soundEiv = new Audio('audio/club.mp3')

  if(this.classList == "cell"){
    count++;
    if(count%2 !== 0){
      this.classList.add("x");
      firstPlayer.push(Number(this.dataset.index));


//***************************//


    //check the first play " X " if win show the message 
    if(check(firstPlayer)){        
        winnerpleyr("Congrats X Win ✌" );
        soundEiv.play();
    //add removeEventListener when " X " is win
        cells.forEach(cell => cell.removeEventListener("click", tie));
        return true;
      }
    } else{
      this.classList.add("o");
      secondPlayer.push(Number(this.dataset.index));

    //check the first play " O " if win show the message 
    if(check(secondPlayer)){
        winnerpleyr("Congrats O Win ✌");
        soundEiv.play();
    //add removeEventListener when " O " is win
        cells.forEach(cell => cell.removeEventListener("click", tie));
        return true;
     }
    }

    //message when tie
    if(count === 9){
      winnerpleyr("Oops tied 😁");
    }
  }
}


//*************************************************************************//


// function replay 
function rep(){
  const win = document.querySelector(".winner");
// 
  firstPlayer = [];
  secondPlayer = [];
  count = 0;
  win.remove();
  [].forEach.call(cells, function(elem) {
    elem.classList.remove("x");
    elem.classList.remove("o");
  });
}
 
//add loop and add addEventListener 
cells.forEach(cell => cell.addEventListener("click", tie));
