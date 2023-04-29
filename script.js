const form = document.querySelector('form');
const input = document.querySelector('#location');
const result = document.querySelector('#result');

const API_KEY = '8a2f53b7537ae7181c8458d221557439'


form.addEventListener('submit', e => {
    e.preventDefault(); // Отменяем стандартное поведение формы

    const location = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            displayResults(data); // Отображаем результаты
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "<p class='error'>City not found. Please try again.</p>";
        })
});

function displayResults(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const tempC = (temp - 32) / 1.8
    const { description, icon } = data.weather[0];

    result.innerHTML = `
    <div class="result">
            <div class="row">
                <p class="name">${name}</p>
                <p class="temp">${Math.round(temp)} &deg;C</p>
            </div>
            <div class="desc">
                <h2 class="label">Decription:</h2>
                <p class="description">${description}</p>
            </div>
            <div class="row ">
                <img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}">
                <p class="humidity">Humidity: ${humidity}%</p>
            </div>
        </div>
    `;
}