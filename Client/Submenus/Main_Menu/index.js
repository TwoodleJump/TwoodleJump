const video = document.getElementById('background-video');
const videos = ['/Client/Submenus/images/LevelOneGameplay.mp4', '/Client/Submenus/images/LevelTwoGameplay.mp4', '/Client/Submenus/images/LevelThreeGameplay.mp4'];
const randomIndex = Math.floor(Math.random() * videos.length);

video.src = videos[randomIndex];

video.addEventListener('ended', () => {
  const randomIndex = Math.floor(Math.random() * videos.length);
  video.src = videos[randomIndex];
  video.currentTime = 0;
  video.play();
});

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

