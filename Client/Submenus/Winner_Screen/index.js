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

document.getElementById("Leaderboard").onclick = function () {
    location.href = "/LeaderboardScreen"
}