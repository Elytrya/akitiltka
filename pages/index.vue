<template>
  <div class="container">
    <div class="main-position">
      <h1 class="title" data-text="">
        Привет! Я <span class="title-name">@Elytrya__</span>
      </h1>
      <p>Веб разработчик из России. Разработчик ботов. Пишу разные вещи на Python, JS.</p>
      <div class="links-position">
        <div class="buttons-row">
          <a href="/projects" class="blob-btn">Мои проекты</a>
          <a href="/socials" class="blob-btn">Мои соц.сети</a>
        </div>
        <div class="buttons-row">
          <a href="/skills" class="blob-btn">Мои скиллы</a>
        </div>
      </div>
    </div>
    <div class="right-position">
      <div class="music-box" :style="musicBoxGradient">
        <div class="stars"></div>
        <h1>Сейчас слушаю:</h1>
        <div v-if="track">
          <h3 :style="{ color: titleColor }" class="animated-title">{{ track.title }}</h3>
          <img v-if="track.cover" :src="track.cover" alt="Обложка альбома" @load="extractColorsFromCover" class="album-cover" />
          <div class="status-container">
            <svg v-if="track.is_playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="animated-icon">
              <path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,21c-4.962,0-9-4.038-9-9S7.038,3,12,3s9,4.038,9,9-4.038,9-9,9Zm-1-11.5v5c0,.829-.671,1.5-1.5,1.5s-1.5-.671-1.5-1.5v-5c0-.829.671-1.5,1.5-1.5s1.5.671,1.5,1.5Zm5,0v5c0,.829-.671,1.5-1.5,1.5s-1.5-.671-1.5-1.5v-5c0-.829.671-1.5,1.5-1.5s1.5.671,1.5,1.5Z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="animated-icon">
              <path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,21c-4.963,0-9-4.038-9-9S7.037,3,12,3s9,4.038,9,9-4.037,9-9,9Zm-3-13.5l8,4.5-8,4.5V7.5Z"/>
            </svg>
          </div>
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: progressWidth }"></div>
          </div>
          <div class="time-info">
            <span class="current-time">{{ formatTime(track.progress_ms) }}</span>
            <span class="remaining-time">{{ formatTime(track.duration_ms - track.progress_ms) }}</span>
          </div>
          <p><strong>Автор:</strong> {{ track.artist }}</p>
        </div>
        <div v-else-if="error">
          <p>{{ error }}</p>
        </div>
        <div v-else>
          <p>Загрузка...</p>
        </div>
      </div>
      <footer>
        <p>Copyright © 2024 Elytrya__. Все права съедены.</p>
      </footer>
    </div>
  </div>
</template>





<script>
export default {
  data() {
    return {
      track: null,
      error: null,
      intervalId: null,
      gradientColors: {
        color1: '#222',
        color2: '#444'
      },
      titleColor: '#fff',
      backgroundImageUrl: '',
    };
  },
  computed: {
    progressWidth() {
      if (this.track && this.track.duration_ms) {
        const percentage = (this.track.progress_ms / this.track.duration_ms) * 100;
        return `${percentage}%`;
      }
      return '0%';
    },
    musicBoxGradient() {
      return {
        backgroundImage: `linear-gradient(135deg, ${this.gradientColors.color1}, ${this.gradientColors.color2}), url(${this.backgroundImageUrl})`,
        transition: 'background-image 1s ease'
      };
    }
  },
  mounted() {
    this.fetchCurrentTrack();

    this.intervalId = setInterval(this.fetchCurrentTrack, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    async fetchCurrentTrack() {
      try {
        let response = await fetch('http://127.0.0.1:5000/current-track');
        
        if (response.status === 401) {
          await this.refreshToken();
          response = await fetch('http://127.0.0.1:5000/current-track');
        }
        
        const data = await response.json();
        
        if (data.error) {
          this.error = data.error;
          this.track = null;
        } else {
          this.track = data.track;
          this.error = null;

          const img = document.querySelector('.music-box img');
          if (img) {
            this.extractColorsFromCover(img.src);
          }
        }
      } catch (error) {
        this.error = 'Ошибка при получении данных';
        console.error('Error fetching current track:', error);
      }
    },
    async extractColorsFromCover(imgSrc) {
      try {
        const response = await fetch(`http://localhost:3001/extract-colors?url=${encodeURIComponent(imgSrc)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const colors = await response.json();
        this.updateGradient(colors.vibrant, colors.muted);
      } catch (error) {
        console.error('Error extracting colors:', error);
      }
    },
    updateGradient(color1, color2) {
      this.gradientColors.color1 = color1;
      this.gradientColors.color2 = color2;
    },
    formatTime(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }
};

</script>

<style src="../assets/css/index.css"></style>
