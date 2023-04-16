// Finds form
const create_game_form = document.getElementById("create_game_form")

// Creates listener for when submit button is hit on form
create_game_form.addEventListener("submit", (event) => {
    event.preventDefault(); // Stops page from refreshing

    // Data from form
    let player_1_name = document.getElementById("player_1_name").value;
    let player_2_name = document.getElementById("player_2_name").value;
    let passcode = document.getElementById("passcode").value;

    passcode = Number(passcode); // Turns passcode into nit

    // Makes sure data is correct
    if (player_1_name == ""){
        console.log("Missing Player 1 Name")
        return;
    }
    if (player_2_name == ""){
        console.log("Missing last name")
        return;
    }
    if (passcode == ""){
        console.log("Missing Passcode")
        return;
    }

    // Makes sure user types in an int for the passcode
    if (!Number.isInteger(passcode)) {
        console.log("Passcode isn't an integer")
        document.getElementById("passcode").value = null; // Sets passcode box back to blank
        return;
    }


    // Prepares data to be posted
    const data = {
        "player1": player_1_name,
        "player2": player_2_name,
        "player1Wins": 0,
        "player2Wins": 0,
        "passcode": passcode,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    // Sends Post
    fetch('/create_game', options);

    // Stores data for the game
    sessionStorage.setItem("passcode", passcode); 
    sessionStorage.setItem("player1Name", player_1_name);
    sessionStorage.setItem("player2Name", player_2_name);
    
    // Goes to the first level
    location.href = "/LevelOne";
});

document.getElementById("MainMenu").onclick = function () {   
    location.href = "/";
};