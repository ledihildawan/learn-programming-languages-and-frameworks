const input = document.querySelector('input');
const card = document.querySelector('.card');
const h1 = document.querySelector('h1');
const weatherIcon = document.querySelector('.weather-icon');
const weatherCondition = document.querySelector('.weather-condition');
const temp = document.querySelector('.weather-temp');
const button = document.querySelector('button');

function reqWeatherByCity(city) {
  const http = new XMLHttpRequest();
  const url = `https://api.apixu.com/v1/current.json?key=39d1a8c355e5472eaf244846193001&q=${city}`;
  const method = 'GET';

  http.open(method, url);
  http.onreadystatechange = () => {
    if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
      input.classList.remove('error');
      const data = JSON.parse(http.responseText);
      renderToHTML(data);
    } else if (http.readyState === XMLHttpRequest.DONE && http.status === 400 || http.status === 404) {
      input.classList.add('error');
      card.style.display = 'none';
      console.clear()
    }
  }

  http.send();
}

function renderToHTML(data) {
  h1.innerHTML = `${data.location.name}, ${data.location.country} <span class="icon-place"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 95 118.75" enable-background="new 0 0 95 95" xml:space="preserve"><path d="M77.132,37.464c-0.006-0.119-0.014-0.236-0.021-0.355c-0.018-0.281-0.037-0.559-0.063-0.826  C75.737,21.108,63.013,9.2,47.5,9.2S19.264,21.108,17.952,36.282c-0.025,0.268-0.046,0.545-0.063,0.826  c-0.007,0.119-0.015,0.236-0.021,0.355c-0.021,0.453-0.035,0.916-0.035,1.404c0,0.504,0.016,1.006,0.038,1.508  c0,0.014,0.001,0.027,0.002,0.039C19.025,65.331,47.5,85.8,47.5,85.8s28.476-20.469,29.626-45.385  c0.002-0.012,0.002-0.025,0.002-0.039c0.023-0.502,0.039-1.004,0.039-1.508C77.167,38.38,77.153,37.917,77.132,37.464z M47.5,49.647  c-7.065,0-12.791-5.727-12.791-12.791S40.435,24.065,47.5,24.065s12.792,5.727,12.792,12.791S54.565,49.647,47.5,49.647z"/></svg></span>`;
  weatherIcon.innerHTML = `<img src="https://${data.current.condition.icon}" />`
  weatherCondition.textContent = data.current.condition.text;
  temp.textContent = data.current.temp_c.toFixed() + '°';
  card.style.display = 'block';
}

input.addEventListener('keyup', function(e) {
  if (this.value.length > 0) {
    if (e.which === 13) {
      reqWeatherByCity(this.value);
    } else {
      reqWeatherByCity(this.value);
    }
  } else {
    card.style.display = 'none';
  }
});

input.addEventListener('change', function(e) {
  if (this.value.length > 0) {
    reqWeatherByCity(this.value);
  } else {
    card.style.display = 'none';
  }
});

button.addEventListener('click', function() {
  if (input.value.length > 0) {
    reqWeatherByCity(input.value);
  } else {
    card.style.display = 'none';
  }
});