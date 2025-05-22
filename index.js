const container = document.querySelector('.container');
const search = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-box button');

const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


searchBtn.addEventListener('click', async () => {
    const city = search.value.trim();
    if (city === '') return;

    // 🔁 Replace with your OpenWeatherMap API key
    const APIKey = '24876839c52ba11354c4f21b02ae2720';

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.cod === '404') {
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }
