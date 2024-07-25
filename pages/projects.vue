<template>
  <div class="projects-container">
    <div class="project-detail" v-if="selectedProject">
      <div class="selected-project">
        <div class="blog-header">
          <h2 class="gradient-text">{{ selectedProject.name }}</h2>
          <p class="project-status">{{ selectedProject.status }}</p>
        </div>
        <div class="blog-content">
          <p class="project-description"><strong>Описание:</strong> {{ selectedProject.description }}</p>
          <p class="project-languages"><strong>Языки программирования:</strong></p>
          <ul>
            <li v-for="language in selectedProject.languages" :key="language" class="gradient-text">
              {{ language }}
            </li>
          </ul>
          <p class="project-links"><strong>Ссылки:</strong></p>
          <ul>
            <li v-for="link in selectedProject.links" :key="link.url">
              <a :href="link.url" target="_blank">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="buttons">
        <button @click="goBack" class="back-button">Вернуться к проектам</button>
        <button @click="goHome" class="home-button">Вернуться на главную</button>
      </div>
    </div>
    <div class="projects-list" v-else>
      <h1 class="page-title">Проекты</h1>
      <p class="page-subtitle">Выберите проект, чтобы узнать о нем больше</p>
      <div class="project-card" v-for="project in projects" :key="project.id" @click="selectProject(project)">
        <div class="project-icon">
          <img :src="project.icon" alt="Project Icon" />
        </div>
        <div class="project-info">
          <h3 class="gradient-text">{{ project.name }}</h3>
          <p>{{ project.shortDescription }}</p>
          <span class="project-status">{{ project.status }}</span>
        </div>
      </div>
      <button @click="goHome" class="home-button">Вернуться на главную</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedProject: null,
      projects: [
        {
          id: 1,
          name: 'SpiderNodes',
          shortDescription: 'Хостинг для дискорд и телеграм ботов',
          description: 'SpiderNodes - это хостинг для дискорд/телеграм ботов и самп серверов.',
          languages: ['Python', 'JavaScript'],
          status: 'В разработке',
          icon: 'https://i.imgur.com/LJ1j8l7.jpg',
          links: [
            { label: 'Официальный сайт', url: 'https://spidernodes.space' },
            { label: 'Билинг панель', url: 'https://my.spidernodes.space' }
          ]
        },
        {
          id: 2,
          name: 'ShadowManager',
          shortDescription: 'Бот для дискорда. Имеет много функций',
          description: 'ShadowManager - многофункциональный бот для дискорда. Имеет много разных функций, такие как тикеты, модерация и другие.',
          languages: ['Python'],
          status: 'Заморожен',
          icon: 'https://i.imgur.com/LN4EfFy.png',
          links: [
            { label: 'Официальный сайт', url: 'https://shadowmanager.space' },
            { label: 'Документация', url: 'https://docs.shadowmanager.space' }
          ]
        },
        {
          id: 3,
          name: 'DepressionAI',
          shortDescription: 'Дискорд бот с нейросетями.',
          description: 'DepressionAI - бот с нейросетями. В данный момент умеет генерировать изображеня и текста. \n  В разработке.',
          languages: ['Python'],
          status: 'В разработке',
          icon: 'https://i.imgur.com/07n2N6N.jpg',
        },
      ],
    };
  },
  methods: {
    selectProject(project) {
      this.selectedProject = project;
    },
    goBack() {
      this.selectedProject = null;
    },
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style src="../assets/css/projects.css"></style>
