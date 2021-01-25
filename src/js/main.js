const formElement = document.querySelector('[data-js="form"]')
const weatherCard = document.querySelector('[data-js="weather-card"]')

const endpoint = cityname => `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=aca1524dfb7f6fe280b35f0def53192d`;

const getAPIData = async (cityname) => {
  try {
    const response = await fetch(endpoint(cityname))
    return response.json()
  } catch (err) {
    console.error(err)
  }
}

const insertDataIntoHTML = (json) => {
  let temperature = Math.floor(json.main.temp)
  let cityname = json.name
  let weatherDescription = json.weather[0].description
  let iconId = json.weather[0].icon
  let country = json.sys.country

  weatherCard.innerHTML = `
    <h2 class="weather-card_city">${cityname} - ${country}</h2>

    <p class="weather-card_temperature">${temperature}°C</p>
    <figure class="weather-card_figure">
      <img src="http://openweathermap.org/img/wn/${iconId}@4x.png" alt="${weatherDescription}">
      <figcaption>${weatherDescription}</figcaption>
    </figure>
  
  `

}

const getData = () => {
  const formData = new FormData(formElement)
  const cityname = formData.get('q')

  getAPIData(cityname).then(json => insertDataIntoHTML(json))
}
// event listener
formElement.addEventListener('submit', e => {
  e.preventDefault()
  getData()
})
