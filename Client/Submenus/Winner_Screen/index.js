// Prints out the winner of the game based on the stored data
const player1Name = sessionStorage.getItem("player1Name");
const player2Name = sessionStorage.getItem("player2Name");
const player1Wins = sessionStorage.getItem("player1Wins");
const player2Wins = sessionStorage.getItem("player2Wins");

const resultsDiv = document.getElementById("results");
resultsDiv.innerHTML = `
  <p><b>${player1Name}</b>: ${player1Wins}</p>
  <p><b>${player2Name}</b>: ${player2Wins}</p>
`;

if (player1Wins > player2Wins) {
  resultsDiv.innerHTML += `<p>${player1Name} wins!</p>`;
} else if (player2Wins > player1Wins) {
  resultsDiv.innerHTML += `<p>${player2Name} wins!</p>`;
} else {
  resultsDiv.innerHTML += "<p>It's a tie!</p>";
}

// Goes back to main menu and deletes the game from saved games
document.getElementById("MainMenu").onclick = function () {
    // Deletes game from Saved Games
    const options = {
        method: 'DELETE',
    }

    const route = "/games/" + sessionStorage.getItem("passcode") 

    // Sends Post
    fetch(route, options);

    // Goes back to menu
    location.href = "/";
};

// Goes to leaderboard screen
document.getElementById("Leaderboard").onclick = function () {
    location.href = "/LeaderboardScreen"
}