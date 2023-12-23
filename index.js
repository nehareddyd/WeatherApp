const apikey = 'd735e3247458742ce38f5ce59e53609c';
const weather = document.getElementById("data");
const city = document.getElementById("city");
const form1 = document.querySelector("form");

form1.addEventListener("submit", async (event) => {
    event.preventDefault();
    const cityValue = city.value;
    await getData(cityValue);
});

async function getData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        
        if (!response.ok) {
            throw new Error("Network error was not okay");
        }

        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed}m/s`
        ];

        weather.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`;
        weather.querySelector(".temp").textContent = `${temp}°C`;
        weather.querySelector(".desc").textContent = desc;
        weather.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join(" ");
    } catch (error) {
        console.error(error);
    }
}

