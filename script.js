function storeForecast(forecast) {
  localStorage.setItem("forecast", JSON.stringify(forecast));
}

async function getLatLng(address) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${address}&count=1&language=english`
    );

    const data = await response.json();

    if (!data.results.length) throw new Error("No results found");
    const loc = data.results[0];

    return [loc.latitude, loc.longitude];
  } catch (error) {
    handleError(error);
  }
}

async function getWeather(lat, lng) {
  try {
    const forecast = await (
      await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=auto&elevation=nan&current=temperature_2m&temperature_unit=fahrenheit`
      )
    ).json();

    return forecast;
  } catch (error) {
    handleError(error);
  }
}

function handleError(error) {
  const parent = document.getElementById("error");
  const errorMsg = document.getElementById("error-msg");
  errorMsg.innerText = error.message;
  parent.style.display = "block";
}

function closeError() {
  const parent = document.getElementById("error");
  parent.style.display = "none";
}

async function onClick() {
  const city = document.getElementById("input").value;
  validateInput(city);
  const [lat, lng] = await getLatLng(city);
  const forecast = await getWeather(lat, lng);
  const temp = forecast.current.temperature_2m;
  const time = forecast.current.time;
  console.log("The temp is:" + temp + "(F)" + "Time:" + time);
  renderWeather(time, temp);
}

function renderWeather(time, temp) {
  document.getElementById("post").innerHTML = "Temperature: " + temp + "(F)";
  document.getElementById("date").innerHTML = "Time: " + time;
}

function validateInput(input) {
  try {
    if (!input.length) throw new Error("Input city");
  } catch (error) {
    handleError(error);
  }
}
