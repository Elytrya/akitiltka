// script.js

// После полной загрузки всех ресурсов страницы (включая изображения и стили)
window.addEventListener('load', function () {
  // Скрыть анимацию загрузки
  var loader = document.querySelector('.loader-container');
  loader.style.opacity = 0;
  setTimeout(function () {
      loader.style.display = 'none';
  }, 500); // Задержка в 0.5 секунды для завершения анимации

  // Добавить класс "loaded" к основному контейнеру страницы
  document.body.classList.add('loaded');
});
