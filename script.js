const redLightElement = document.querySelector("[data-js-red-light]");
const yellowLightElement = document.querySelector("[data-js-yellow-light]");
const greenLightElement = document.querySelector("[data-js-green-light]");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const nextBtn = document.getElementById("next");

const lightColorsArray = ["red", "yellow", "green"];
let currentIndex = 0;
let timerId = null; // хранит ID текущего setTimeout

// Универсальная функция для включения одного цвета
function turnOnLight(color) {
  redLightElement.classList.toggle("active", color === "red");
  yellowLightElement.classList.toggle("active", color === "yellow");
  greenLightElement.classList.toggle("active", color === "green");
}

// Автоматическая смена цветов
function switchColor() {
  const currentColor = lightColorsArray[currentIndex];
  turnOnLight(currentColor);

  // Задаём разное время для каждого цвета
  let delay = 1000;
  if (currentColor === "red") delay = 5000;
  if (currentColor === "yellow") delay = 1000;
  if (currentColor === "green") delay = 3000;

  // Переключаем на следующий цвет
  currentIndex = (currentIndex + 1) % lightColorsArray.length;

  // Сохраняем ID таймера, чтобы потом можно было остановить
  timerId = setTimeout(switchColor, delay);
}

// Запуск авто-режима
startBtn.addEventListener("click", () => {
  if (!timerId) {
    switchColor();
  }
});

// Остановка авто-режима
stopBtn.addEventListener("click", () => {
  clearTimeout(timerId);
  timerId = null;
});

// Переключение на следующий цвет вручную
nextBtn.addEventListener("click", () => {
  clearTimeout(timerId); // если авто-режим работал, останавливаем
  timerId = null;
  currentIndex = (currentIndex + 1) % lightColorsArray.length;
  turnOnLight(lightColorsArray[currentIndex]);
});
