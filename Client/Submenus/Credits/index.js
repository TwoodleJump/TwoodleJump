document.getElementById("MainMenu").onclick = function () {   
    location.href = "/";
};

const video = document.getElementById("background-video");
const videos = [
  "/Client/Submenus/images/LevelOneGameplay.mp4",
  "/Client/Submenus/images/LevelTwoGameplay.mp4",
  "/Client/Submenus/images/LevelThreeGameplay.mp4",
];
const randomIndex = Math.floor(Math.random() * videos.length);

video.src = videos[randomIndex];

video.addEventListener("ended", () => {
  const randomIndex = Math.floor(Math.random() * videos.length);
  video.src = videos[randomIndex];
  video.currentTime = 0;
  video.play();
});
