const video = document.getElementById('background-video')

video.addEventListener('ended', () => {
    video.currentTime = 0;
    video.play();
})

document.getElementById("StartGameButton").onclick = function () {
    console.log("hit button")

    location.href = "/CreateGameScreen";
};

document.getElementById("HowToPlayButton").onclick = function () {
    console.log("hit button")
    location.href = "/HowToPlay";
};

document.getElementById("CreditsButton").onclick = function () {
    console.log("hit button")
    location.href = "/Credits";
};

document.getElementById("LoadGameButton").onclick = function () {
    console.log("hit button")
    location.href = "/LoadGame";
};

