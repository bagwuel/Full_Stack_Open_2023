import {useState, useEffect} from 'react'
import axios from 'axios'


const Languages = ({lang}) => {
  return (
    <ul>
      {
        Object.values(lang).map((value, index) => <li key={index}>{value}</li>)
      }
    </ul>
  )
}

const Country = ({country, weather}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p>languages:</p>
      <Languages lang={country.languages} />
      <img src={country.flags.svg} alt={country.flag} width={200} />
      <br /><br />
      <img src={country.coatOfArms.svg} alt={country.flag} width={200} />
      <h3>Weather in {country.capital}</h3>
      {weather && <Weather forecast={weather} />}
    </div>
  )
}

const Weather =({forecast}) => {
    return(
      <div>
        temperature: {forecast.temperature} Celcius
        <br />
        <img src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`} alt={forecast.icon} />
        <br />
        wind: {forecast.windspeed} m/s
      </div>
    )
}

const FilteredCountries = ({matchedCountries, show}) => {
  return (
    matchedCountries.map((country, index) => <li key={index}>
    {country.name.common}  
    <button onClick={() => {show(country)}}>show</button>
    </li>)
  )
}


function App() {
  const [countries, setCountries] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [matchedCountries, setMatchedCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setCountries(response.data))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (matchedCountries.length === 1) {
      const countryCapital = matchedCountries[0].capital

      const api_key = process.env.REACT_APP_API_KEY

      let icon = ''

      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&appid=${api_key}`)
      .then(res => {
        icon = res.data.weather[0].icon
        return axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${res.data.coord.lat}&longitude=${res.data.coord.lon}&current_weather=true`)
      })
      .then(res => {
        setWeather({...res.data.current_weather, icon})
      })  
      .catch(err => console.log(err))
    }
  }, [matchedCountries])

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)

    if (countries) {
      const filtered = countries.filter(country => country.name.common.toLowerCase().includes(searchQuery.toLowerCase()))
      setMatchedCountries(filtered)
    }
  }

  const showCountry = (country) => {
    setMatchedCountries([country])
  }

  return (
    <div>
      find countries: <input type="search" 
      name='search'
      value={searchQuery}
      onChange={handleSearch}
      />
    
    {
      matchedCountries.length === 1
      ? <Country country={matchedCountries[0]} weather={weather} />
      : (matchedCountries.length > 0 && matchedCountries.length < 10)
      ? <FilteredCountries matchedCountries={matchedCountries} show={showCountry}/>
      : searchQuery 
      ? <p>Too many matches, specify another filter</p> 
      : null
    }
    </div>
  );
}

export default App;
