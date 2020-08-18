//rgb(RED, GREEN, BLUE)
var numSquares = 8;
var colors = [];
var correctColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var displayTries = document.getElementById("tries");
var numTries = 4;
var span = document.querySelectorAll("span")[1];
span.classList.remove("gameOver");
init();

function init(){
    setModeButtons();
    setNumSquares();
    reset();
}

resetButton.addEventListener("click", function(){
    reset();
})

function setModeButtons(){
    for (var i =0;i<modeButtons.length;i++){
        modeButtons[i].addEventListener("click",function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");          
            if(this.textContent==="Easy"){
                numSquares = 4;
            } else if (this.textContent ==="Medium") {
                numSquares = 8;
            } else {
                numSquares = 12;
            }
            reset();
        })
    }
}

function setNumSquares(){
    for (var i =0; i<squares.length; i++){
        //add click listeneres to squares
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === correctColor){
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            } else{
                this.style.backgroundColor = "#232323"; 
                messageDisplay.textContent = "Try Again";
                numTries = numTries - 1;
                displayTries.textContent = numTries;
                if (numTries === 0){
                    gameOver();
                }
            }
        })
    }
}

function reset(){
    colors = generateRandomColors(numSquares);
    //pick new random color
    correctColor = randomCorrectColor();
    colorDisplay.textContent = correctColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors"
    displayTries.textContent = 4;
    numTries = 4;
    span.classList.remove("gameOver");
    //change colors of all squares
    for (var i = 0;i<squares.length;i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else{
            squares[i].style.display = "none";
        }
        
    }
    //change h1 background color
    h1.style.backgroundColor = "#666060";
}

function gameOver(){
    span.classList.add("gameOver");
    messageDisplay.textContent = "GAME OVER";
    resetButton.textContent = "Play Again?";
    displayTries.textContent = "Game Over";
    for (var i = 0; i<colors.length; i++){
        squares[i].style.display = "none";
    }    
}

//change all squares to correct color
function changeColors(color){
    for (var i = 0; i<colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}
//from array of colors pick random correct color
function randomCorrectColor(){
    var random = Math.floor(Math.random()*colors.length);
    return colors[random];
}
//generate array of random colors
function generateRandomColors(num){
    var arr = []
    for (var i=0; i<num; i++){
        arr.push(randomColor())
    }
    return arr;
}
//generate random color
function randomColor(){
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    var color = "rgb(" + red+", "+blue+", "+green+ ")";
    return color;
}