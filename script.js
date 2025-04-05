 // JavaScript
 const video = document.getElementById('dipsyk-video');
 const playBtn = document.getElementById('dipsyk-play-btn');
 const muteBtn = document.getElementById('dipsyk-mute-btn');
 const fullscreenBtn = document.getElementById('dipsyk-fullscreen-btn');
 const progressBar = document.getElementById('dipsyk-progress-bar');
 const progressContainer = document.getElementById('dipsyk-progress-container');
 const currentTimeEl = document.getElementById('dipsyk-current-time');
 const durationEl = document.getElementById('dipsyk-duration');
 const volumeSlider = document.getElementById('dipsyk-volume');

 // Воспроизведение/пауза
 playBtn.addEventListener('click', () => {
     if (video.paused) {
         video.play();
         playBtn.textContent = '❚❚';
     } else {
         video.pause();
         playBtn.textContent = '▶';
     }
 });

 // Обновление прогресса
 video.addEventListener('timeupdate', () => {
     const progress = (video.currentTime / video.duration) * 100;
     progressBar.style.width = `${progress}%`;
     
     // Обновление времени
     currentTimeEl.textContent = formatTime(video.currentTime);
     if (!isNaN(video.duration)) {
         durationEl.textContent = formatTime(video.duration);
     }
 });

 // Перемотка при клике на прогресс-бар
 progressContainer.addEventListener('click', (e) => {
     const width = progressContainer.clientWidth;
     const clickX = e.offsetX;
     const duration = video.duration;
     video.currentTime = (clickX / width) * duration;
 });

 // Форматирование времени
 function formatTime(seconds) {
     const minutes = Math.floor(seconds / 60);
     const secs = Math.floor(seconds % 60);
     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
 }

 // Громкость
 volumeSlider.addEventListener('input', () => {
     video.volume = volumeSlider.value;
     if (video.volume === 0) {
         muteBtn.textContent = '🔇';
     } else {
         muteBtn.textContent = '🔊';
     }
 });

 // Отключение звука
 muteBtn.addEventListener('click', () => {
     if (video.volume > 0) {
         video.volume = 0;
         volumeSlider.value = 0;
         muteBtn.textContent = '🔇';
     } else {
         video.volume = 1;
         volumeSlider.value = 1;
         muteBtn.textContent = '🔊';
     }
 });

 // Полноэкранный режим
 fullscreenBtn.addEventListener('click', () => {
     const player = document.querySelector('.dipsyk-video-player');
     if (player.requestFullscreen) {
         player.requestFullscreen();
     } else if (player.webkitRequestFullscreen) {
         player.webkitRequestFullscreen();
     } else if (player.msRequestFullscreen) {
         player.msRequestFullscreen();
     }
 });

 // Обновление длительности видео при загрузке
 video.addEventListener('loadedmetadata', () => {
     durationEl.textContent = formatTime(video.duration);
 });