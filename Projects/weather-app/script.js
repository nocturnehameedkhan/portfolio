const API_KEY = ' 88040b2b5f3ddcf4d567e65791870e0b';

const weatherIcons = {
  Clear: '☀️', Clouds: '☁️', Rain: '🌧️',
  Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️',
  Mist: '🌫️', Haze: '🌫️', Fog: '🌫️', default: '🌡️'
};

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  const errorEl = document.getElementById('error');
  const card = document.getElementById('weatherCard');
  errorEl.classList.add('hidden');
  card.classList.add('hidden');

  // Demo mode if no API key
  if (API_KEY === '88040b2b5f3ddcf4d567e65791870e0b') {
    showDemoData(city);
    return;
  }

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!res.ok) throw new Error('Not found');
    const data = await res.json();
    displayWeather(data);
  } catch {
    errorEl.classList.remove('hidden');
  }
}

function displayWeather(data) {
  const main = data.weather[0].main;
  document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('weatherIcon').textContent = weatherIcons[main] || weatherIcons.default;
  document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('humidity').textContent = `${data.main.humidity}%`;
  document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;
  document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
  document.getElementById('weatherCard').classList.remove('hidden');
}

function showDemoData(city) {
  // Shows demo data when no API key is set
  const demoData = {
    name: city, sys: { country: 'XX' },
    weather: [{ main: 'Clear', description: 'clear sky (demo mode)' }],
    main: { temp: 24, humidity: 62, feels_like: 22 },
    wind: { speed: 4 }, visibility: 10000
  };
  displayWeather(demoData);
}

document.getElementById('cityInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') getWeather();
});