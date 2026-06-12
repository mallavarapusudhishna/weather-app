document.addEventListener("DOMContentLoaded", () => {

  const cityInput =
    document.getElementById("city-input");

  const getWeatherBtn =
    document.getElementById("get-weather-btn");

  const weatherInfo =
    document.getElementById("weather-info");

  const errorMessage =
    document.getElementById("error-message");

  // ADD YOUR API KEY
  
  const API_KEY =
    "071506e78fae8f5447d296c42fb6edef";

  // BUTTON CLICK

  getWeatherBtn.addEventListener("click", () => {

    const city =
      cityInput.value.trim();

    if (city === "") return;

    getWeather(city);

  });

  // ENTER KEY

  cityInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

      getWeatherBtn.click();

    }

  });

  // MAIN FUNCTION

  async function getWeather(city) {

    try {

      getWeatherBtn.disabled = true;

      getWeatherBtn.textContent =
        "Loading...";

      const weatherData =
        await fetchWeatherData(city);

      displayWeatherData(weatherData);

    }
    catch (error) {

      showError(error.message);

    }
    finally {

      getWeatherBtn.disabled = false;

      getWeatherBtn.textContent =
        "Get Weather";

    }

  }

  // FETCH WEATHER

  async function fetchWeatherData(city) {

    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response =
      await fetch(url);

    if (response.status === 404) {

      throw new Error("City not found");

    }

    if (response.status === 401) {

      throw new Error("Invalid API key");

    }

    const data =
      await response.json();

    return data;

  }

  // DISPLAY WEATHER

  function displayWeatherData(data) {

    const {
      name,
      main,
      weather,
      wind,
      sys
    } = data;

    const description =
      weather[0].description
      .charAt(0)
      .toUpperCase() +
      weather[0].description.slice(1);

    weatherInfo.innerHTML = `

      <h2>
        ${name}, ${sys.country}
      </h2>

      <img
        src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"
        alt="Weather Icon"
      />

      <p>
        Temperature:
        ${main.temp}°C
      </p>

      <p>
        Feels Like:
        ${main.feels_like}°C
      </p>

      <p>
        Humidity:
        ${main.humidity}%
      </p>

      <p>
        Wind Speed:
        ${wind.speed} m/s
      </p>

      <p>
        Weather:
        ${description}
      </p>

    `;

    changeBackground(weather[0].main);

    weatherInfo.classList.remove("hidden");

    errorMessage.classList.add("hidden");

  }

  // ERROR

  function showError(message) {

    weatherInfo.classList.add("hidden");

    errorMessage.textContent =
      message;

    errorMessage.classList.remove("hidden");

  }

  // BACKGROUND IMAGES

  function changeBackground(weatherType) {

    switch (weatherType) {

      case "Clear":

        document.body.style.backgroundImage =
          "url('./images/sunny.jpg')";

        break;

      case "Clouds":

        document.body.style.backgroundImage =
          "url('./images/clouds.jpg')";

        break;

      case "Rain":

        document.body.style.backgroundImage =
          "url('./images/rainy.jpg')";

        break;

      case "Drizzle":

        document.body.style.backgroundImage =
          "url('./images/drizzle.jpg')";

        break;

      case "Thunderstorm":

        document.body.style.backgroundImage =
          "url('./images/thunderstorm.jpg')";

        break;

      case "Snow":

        document.body.style.backgroundImage =
          "url('./images/snow.jpg')";

        break;

      case "Mist":

        document.body.style.backgroundImage =
          "url('./images/mist.jpg')";

        break;

      case "Fog":

        document.body.style.backgroundImage =
          "url('./images/mist.jpg')";

        break;

      case "Haze":

        document.body.style.backgroundImage =
          "url('./images/mist.jpg')";

        break;

      case "Dust":

        document.body.style.backgroundImage =
          "url('./images/mist.jpg')";

        break;

      default:

        document.body.style.backgroundImage =
          "url('./images/overcast.jpg')";

    }

  }

});
