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

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = weatherBox.querySelector('img');
        const temperature = weatherBox.querySelector('.temperature');
        const description = weatherBox.querySelector('.description');
        const humidity = weatherDetails.querySelector('.humidity span');
        const wind = weatherDetails.querySelector('.wind span');

        // ✅ Weather image based on condition
        switch (data.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Haze':
                image.src = 'images/mist.png';
                break;
            default:
                image.src = '';
        }
        temperature.innerHTML = `${parseInt(data.main.temp)}°C`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed} Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    } catch (error) {
        console.error("API fetch error:", error);
    }
});
