const videoContainer = document.querySelector(".video-container");
const video = document.querySelector(".video-container video");
const controlsContainer = document.querySelector(
  ".video-container .controls-container"
);

const playPauseButton = document.querySelector(
  ".video-container .controls button.play-pause"
);
const rewindButton = document.querySelector(
  ".video-container .controls button.rewind"
);
const fastForwardButton = document.querySelector(
  ".video-container .controls button.fast-forward"
);

const volumeButton = document.querySelector(
  ".video-container .controls button.volume"
);

const fullScreenButton = document.querySelector(
  ".video-container .controls button.full-screen"
);
const playButton = playPauseButton.querySelector(".playing");
const pauseButton = playPauseButton.querySelector(".paused");
const fullVolumeButton = volumeButton.querySelector(".full-volume");
const mutedButton = volumeButton.querySelector(".muted");

const maximizeButton = fullScreenButton.querySelector(".maximize");
const minimizeButton = fullScreenButton.querySelector(".minimize");
const progressBar = document.querySelector(
  ".video-container .progress-controls .progress-bar"
);
const watchedBar = document.querySelector(
  ".video-container .progress-controls .progress-bar .watched-bar"
);
const timeLeft = document.querySelector(
  ".video-container .progress-controls .time-remaining"
);

let controlsTimeout;
controlsContainer.style.opacity = "0";
watchedBar.style.width = "0px";
pauseButton.style.display = "none";
minimizeButton.style.display = "none";

const displayControls = () => {
  controlsContainer.style.opacity = "1";
  document.body.style.cursor = "initial";
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
  }
  controlsTimeout = setTimeout(() => {
    controlsContainer.style.opacity = "0";
    document.body.style.cursor = "none";
  }, 5000);
};

const playPause = () => {
  if (video.paused) {
    video.play();
    playButton.style.display = "none";
    pauseButton.style.display = "";
  } else {
    video.pause();
    playButton.style.display = "";
    pauseButton.style.display = "none";
  }
};

const toggleMute = () => {
  if (video.muted) {
    fullVolumeButton.style.display = "";
    mutedButton.style.display = "none";
  } else {
    fullVolumeButton.style.display = "none";
    mutedButton.style.display = "";
  }
  video.muted = !video.muted;
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    minimizeButton.style.display = "none";
    maximizeButton.style.display = "";
  } else {
    minimizeButton.style.display = "";
    maximizeButton.style.display = "none";
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    playPause();
  }

  if (event.code === "KeyM") {
    toggleMute();
  }

  if (event.code === "KeyF") {
    toggleFullScreen();
  }
  displayControls();
});

document.addEventListener("mousemove", () => {
  displayControls();
});

video.addEventListener("timeupdate", () => {
  watchedBar.style.width = (video.currentTime / video.duration) * 100 + "%";
  const totalSecondsRemaining = video.duration - video.currentTime;
  const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
  const secondsRemaining = Math.floor(
    totalSecondsRemaining - minutesRemaining * 60
  );
  timeLeft.textContent = `${minutesRemaining
    .toString()
    .padStart(2, "0")}:${secondsRemaining.toString().padStart(2, "0")}`;
});

progressBar.addEventListener("click", (event) => {
  const pos =
    (event.pageX -
      (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) /
    progressBar.offsetWidth;
  video.currentTime = pos * video.duration;
});

playPauseButton.addEventListener("click", playPause);

rewindButton.addEventListener("click", () => {
  video.currentTime -= 10;
});

fastForwardButton.addEventListener("click", () => {
  video.currentTime += 10;
});

volumeButton.addEventListener("click", toggleMute);

fullScreenButton.addEventListener("click", () => {
  toggleFullScreen();
});
