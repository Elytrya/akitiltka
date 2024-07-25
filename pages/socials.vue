<template>
  <div class="container">
    <div class="main-position">
      <h1 class="title" data-text="">
        Мои соц.сети <span class="title-name">@Elytrya__</span>
      </h1>
      <p>Следите за мной на различных платформах!</p>
      <div class="links-position">
        <div class="buttons-row">
          <a href="https://github.com/Elytrya" target="_blank" class="blob-btn">GitHub</a>
          <button @click="copyDiscord" class="blob-btn">Discord</button>
          <a href="https://t.me/akitiltka" target="_blank" class="blob-btn">Telegram</a>
        </div>
        <!-- Добавлена кнопка "Вернуться назад" -->
        <button @click="goBack" class="back-btn">Вернуться назад</button>
      </div>
      <transition name="fade">
        <div v-if="notification" class="notification">
          <div class="notification__body">
            <img src="../assets/images/check-circle.svg" alt="Success" class="notification__icon">
            {{ notificationMessage }}
          </div>
          <div class="notification__progress"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

  
<script>
export default {
  name: 'SocialMedia',
  data() {
    return {
      discordUsername: 'akirula',
      notification: false,
      notificationMessage: '',
    };
  },
  methods: {
    async copyDiscord() {
      try {
        await navigator.clipboard.writeText(this.discordUsername);
        this.showNotification('Discord юзернейм скопирован в буфер обмена!');
      } catch (err) {
        console.error('Ошибка при копировании: ', err);
        this.showNotification('Ошибка при копировании юзернейма.');
      }
    },
    showNotification(message) {
      this.notificationMessage = message;
      this.notification = true;
      setTimeout(() => {
        this.notification = false;
      }, 3000);
    },
    goBack() {
      this.$router.push('/'); // Навигация на главную страницу
    }
  }
};
</script>

  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400&display=swap');
  
  body {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
    font-style: normal;
    background-color: #131313;
    color: #e0e0e0;
    overflow: hidden;
    text-decoration: none;
    margin: 0;
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .main-position {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    animation: fadeIn 2s ease-in-out;
  }
  
  .title-name {
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 20px;
    background: linear-gradient(to right, #4f3eec, #0c3a7a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .title {
    font-size: 50px;
  }
  
  .links-position .buttons-row {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 15px;
  }
  
  .blob-btn {
    position: relative;
    padding: 15px 30px;
    margin: 0 10px;
    background: #4f3eec;
    border: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    border-radius: 30px;
    overflow: hidden;
    transition: color 0.5s, background-color 0.5s, transform 0.3s;
  }
  
  .blob-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: rgba(71, 120, 255, 0.5);
    border-radius: 50%;
    transition: transform 0.3s;
    transform: translate(-50%, -50%) scale(0);
  }
  
  .blob-btn:hover::before {
    transform: translate(-50%, -50%) scale(1);
  }
  
  .blob-btn:hover {
    background-color: #5500ff;
    transform: scale(1.05);
  }
  
  .notification {
    position: absolute;
    width: max-content;
    left: 0;
    right: 0;
    bottom: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 0.375rem;
    background-color: #313e2c;
    color: #aaec8a;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(1.875rem);
    opacity: 0;
    visibility: hidden;
    animation: fade-in 3s linear;
  }
  
  .notification__icon {
    height: 1.625rem;
    width: 1.625rem;
    margin-right: 0.25rem;
  }
  
  .notification__body {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem 0.5rem;
  }
  
  .notification__progress {
    position: absolute;
    left: 0.25rem;
    bottom: 0.25rem;
    width: calc(100% - 0.5rem);
    height: 0.2rem;
    transform: scaleX(0);
    transform-origin: left;
    background: linear-gradient(to right, #313e2c, #aaec8a);
    border-radius: inherit;
    animation: progress 2.5s 0.3s linear;
  }
  
  @keyframes fade-in {
    5% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    95% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes progress {
    to {
      transform: scaleX(1);
    }
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Адаптивные стили для мобильных устройств */
  @media (max-width: 1208px) {
    .container {
      flex-direction: column;
    }
  
    .main-position {
      margin-bottom: 20px;
    }
  
    .title-name {
      font-size: 35px;
    }
  
    .title {
      font-size: 35px;
    }
  
    .links-position .buttons-row {
      width: 100%;
      flex-direction: column;
    }
  
    .blob-btn {
      width: 100%;
      margin: 10px 0;
      padding: 15px;
    }
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  .back-btn {
  padding: 10px 20px;
  margin-top: 20px; /* Расстояние между кнопками */
  background: #333;
  border: none;
  color: #e0e0e0;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 30px;
  overflow: hidden;
  transition: background-color 0.3s, transform 0.3s;
}

.back-btn:hover {
  background-color: #555;
  transform: scale(1.05);
}

/* Адаптивные стили */
@media (max-width: 1208px) {
  .back-btn {
    width: 100%;
    margin-top: 10px;
  }
}
  </style>
  