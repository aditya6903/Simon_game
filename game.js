// Store all possible button colours
var buttonColours = ["red", "blue", "green", "yellow"];

// Store the game sequence
var gamePattern = [];

// Store the user's clicked sequence
var userClickedPattern = [];

// Check if the game has started
var started = false;

// Store the current level
var level = 0;


// Generate the next colour in the sequence
function nextSequence() {

    // console.log("nextSequence called");

    // Clear the user's previous answers
    userClickedPattern = [];

    // Increase the level
    level++;

    // Show the current level on the screen
    $("#level-title").text("Level " + level);

    // Generate a random number from 0 to 3
    var randomNumber = Math.floor(Math.random() * 4);

    // Get the colour using the random number
    var randomChosenColour = buttonColours[randomNumber];

    // Add the colour to the game sequence
    gamePattern.push(randomChosenColour);

    // Flash the selected button
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play the sound of the selected button
    playSound(randomChosenColour);
}


// Play the sound of a given colour
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// Detect when a game button is pressed
$(".btn").on("pointerdown", function (event) {

    // Prevent default browser behaviour
    event.preventDefault();

    // Do nothing if the game has not started
    if (!started) {
        return;
    }

    // Get the id of the clicked button
    var userChosenColour = $(this).attr("id");

    // Save the user's choice
    userClickedPattern.push(userChosenColour);

    // Play the button sound
    playSound(userChosenColour);

    // Show button press animation
    animatePress(userChosenColour);

    // Check if the answer is correct
    checkAnswer(userClickedPattern.length - 1);
});


// Animate the pressed button
function animatePress(currentColour) {

    // Add the pressed class
    $("#" + currentColour).addClass("pressed");

    // Remove the pressed class after 100ms
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


// Start the game when any keyboard key is pressed
$(document).on("keydown", function () {

    if (!started) {
        started = true;
        nextSequence();
    }

});


// Start the game on mobile when the circle is touched
$(".circle").on("pointerdown", function (event) {

    if ($(event.target).hasClass("btn")) {
        return;
    }

    if (!started) {
        started = true;
        nextSequence();
    }

});

// Check if the user's answer is correct
function checkAnswer(currentLevel) {

    // Compare the current user answer with the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // If the user completed the whole sequence
        if (userClickedPattern.length === gamePattern.length) {

            // Wait for 1 second before showing the next level
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        // Play wrong sound
        playSound("wrong");

        // Show game over effect
        $("body").addClass("game-over");

        // Remove game over effect after 200ms
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // console.log("Game Over");

        // Show restart message
        $("#level-title").text("Game Over! Tap or Press Any Key to Restart");

        // Reset the game
        startOver();
    }
}


// Reset the game variables
function startOver() {

    // Reset level
    level = 0;

    // Clear the game pattern
    gamePattern = [];

    // Allow the game to start again
    started = false;
}