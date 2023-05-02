document.getElementById("MainMenu").onclick = function () {   
    location.href = "/";
};
const audio1 = document.getElementById("background-audio-1");
const audio2 = document.getElementById("background-audio-2");
const audio3 = document.getElementById("background-audio-3");
const video = document.getElementById("background-video");

const audios = [
  "/Client/Submenus/Images/Bob-ombBattlefield.mp3",
  "/Client/Submenus/Images/coolMountain.mp3",
  "/Client/Submenus/Images/mansion.mp3",

];
const videos = [
  "/Client/Submenus/images/LevelOneGameplay.mp4",
  "/Client/Submenus/images/LevelTwoGameplay.mp4",
  "/Client/Submenus/images/LevelThreeGameplay.mp4",
];
const randomIndex = Math.floor(Math.random() * videos.length);

video.src = videos[randomIndex];
document.getElementById("background-audio-" + (randomIndex + 1)).play();


video.addEventListener("ended", () => {
  const randomIndex = Math.floor(Math.random() * videos.length);
  video.src = videos[randomIndex];
  // video.currentTime = 0;
  // video.play();
  audios[randomIndex].currentTime = 0;
  audios[randomIndex].play();
});


