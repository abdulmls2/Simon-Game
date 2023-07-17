
var buttonColours = ["red", "blue", "green", "yellow"]; //Buttons of the game

var gamePattern = []; // Array to store the pattern generated by the game
var userClickedPattern = []; //Array to store the pattern clicked by user

var started = false; //Check if game started
var level = 0; //Current level of the game
var score = [0] // Array to store the scores
var my_array = [0] //Array to store the highest score

//Event listeners for key pressed
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Event listener for buttons clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//Function to check answer (button clicked)
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      const score1 = level;
      $("#score").text("Previous Score " + score1);

      my_array.push(level)
      $("#max-score").text("Highest Score " + Math.max(...my_array));

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

//Function to generate the next level sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  $("#score").text("Previous Score " + score);
  $("#max-score").text("Highest Score " + Math.max(...my_array));

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//Restart the game
function startOver() {
  score = level;
  level = 0;
  gamePattern = [];
  started = false;
}



//Audio and Animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


