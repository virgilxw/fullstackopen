import { useState } from 'react'
import axios from 'axios'

const Search = ({ searchbox, handleSearchboxChange }) => {
  return (
    <>
      <p>find countries
        <input
          value={searchbox}
          onChange={handleSearchboxChange}
        />
      </p>
    </>
  )
}

const Stats = ({ country }) => {
  return (<>
    <p>captial {country.capital.map((name, index) => {
      return (
        <span key={name}>{name} {index < country.capital.length - 1 ? ", " : ""}</span>
      );
    })}</p>
    <p>area {country.area}</p>
  </>
  )
}

const Languages = ({ languages }) => {
  return (
    <div>
      <h2>languages:</h2>
      <ul>
        {
          Object.keys(languages).map((oneKey, i) => {
            return (
              <li key={i}>{languages[oneKey]}</li>
            )
          })}
      </ul>
    </div>
  )
}

const Weather = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const capital = country.capital[0]
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState(0)
  const [img, setImg] = useState("")

  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + country.capitalInfo.latlng[0] + "&lon=" + country.capitalInfo.latlng[1] + "&appid=" + api_key +"&units=metric"

  axios.get(url).then(response => {
    const data = response.data
    setTemp(data.main.temp)
    setWind(data.wind.speed)
    setImg(" http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
  })

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {temp} Celcius</p>
      <img src={img}></img>
      <p>wind {wind} m/s</p>
    </div>
  )
}

const CountryExpanded = ({ country }) => {
  return (<div>
    <h1>{country.name.common}</h1>
    <br />
    <Stats country={country} />
    <br />
    <Languages languages={country.languages} />
    <br />
    <img src={country.flags.png}></img>
    <br />
    <Weather country={country} />
  </div>)
}

const CountryLi = ({ country }) => {
  const [showResults, setShowResults] = useState(false)
  const onClick = () => setShowResults(!showResults)
  return (
  <li>
    {country.name.common}
    <input type="submit" value="Search" onClick={onClick} />
      { showResults ? <CountryExpanded country={country} /> : null }
  </li>
  )
}
const Output = ({ filteredCountriesList }) => {

  if (filteredCountriesList.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else {
    return (
      <ul>
        {filteredCountriesList.map((country) => {
          return (
            <CountryLi key={country.name.common} country={country}/>) 
        })
        }
      </ul>
    )
  }
}

const App = () => {
  const [searchbox, setSearchbox] = useState("")
  const [filteredCountriesList, setFilteredCountriesList] = useState([])

  const handleSearchboxChange = (event) => {
    setSearchbox(event.target.value)
    const url = 'https://restcountries.com/v3.1/name/' + event.target.value.toLowerCase()

    axios.get(url).then(response => setFilteredCountriesList(response.data))
  }

  return (
    <>
      <Search searchbox={searchbox} handleSearchboxChange={handleSearchboxChange} />
      <Output filteredCountriesList={filteredCountriesList} />
    </>
  );
}

export default App;
