const key = 'P2bQNbtE3kG4piWBVUcTpUQLLn1DtK2M'
const city = 'manchester'
const locationAPIUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`

const forecastAPIUrl = locationKey => `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}`

const handleResponse = response => response.json()

const handleLocationData = data => {
  return forecastAPIUrl(data[0].Key)
}

const handleError = err => console.error(err)


// || get location information
fetch(locationAPIUrl)
  .then(handleResponse)
  .then(handleLocationData)
  .then(url => console.log(url))
  .catch(handleError)

