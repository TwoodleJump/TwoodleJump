// Finds form
const create_game_form = document.getElementById("game_passcode_form")

// Creates listener for when submit button is hit on form
create_game_form.addEventListener("submit", (event) => {
    event.preventDefault(); // Stops page from refreshing
    sessionStorage.setItem("passcode", ""); 

    let passcode = document.getElementById("passcode").value;
    passcode = Number(passcode);


    loadGame(passcode)
})

document.getElementById("MainMenu").onclick = function () {
    location.href = "/";
};

// Gets data from database that is associated with the passcode.
// If no game can be found, sessionStorage.getItem("passcode") will stay as ""
async function getData(passcode){
    const options = {
        method: 'GET'
    }
  
    await fetch('/games', options)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
    }).then(data => {
        // If there is data, look for game
        if(data) {
            // Looks through each saved game for the one with the correct passcode
            for (let i = 0; i < data.length; i++){
                if (data[i]["passcode"] == passcode){
                    sessionStorage.setItem("passcode", passcode); 
                    sessionStorage.setItem("player1Wins", data[i]["player1Wins"]);
                    sessionStorage.setItem("player2Wins", data[i]["player2Wins"]);
                    sessionStorage.setItem("player1Name", data[i]["player1"]);
                    sessionStorage.setItem("player2Name", data[i]["player2"]);
                    return;
                }
            }
        }
    })
}

// Validates if the user types in a valid passcode
async function loadGame(passcode) {
    await getData(passcode); // Waits for this function to complete before continuing

    // If we found a passcode from the database, go to the next screen
    if (sessionStorage.getItem("passcode") == passcode){
        nextScreen()
    // If no passcode was found, reset the passcode value
    } else {
        document.getElementById("passcode").value = "";
    }
}

// Redirects to level or end game screen based on the amount of wins
function nextScreen(){
    // Sets wins based on what was stored in sessionStorage
    const player1Wins = Number(sessionStorage.getItem("player1Wins"));
    const player2Wins = Number(sessionStorage.getItem("player2Wins"));

    // Goes to level 2
    if ((player1Wins + player2Wins) == 0) {
        // console.log("going to level one");
        location.href = "/LevelOne";
    } else if ((player1Wins + player2Wins) == 1) {
        // console.log("going to level 2")
        location.href = "/LevelTwo";
    // Goes to level 3
    } else if (player1Wins != 2 && player2Wins != 2) {
        // console.log("going to level 3")
        location.href = "/LevelThree";
    // Goes to End game
    } else {
        // console.log("going to end game")
        location.href = "/WinnerScreen";
    }
}