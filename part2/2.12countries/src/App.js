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
    <>
      <h2>languages:</h2>
      <ul>
        {
          Object.keys(languages).map((oneKey, i) => {
            return (
              <li key={i}>{languages[oneKey]}</li>
            )
          })}
      </ul>
    </>
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
  </div>)
}

const CountryLi = ({ country }) => {
  const [showResults, setShowResults] = useState(false)
  const onClick = () => setShowResults(!showResults)
  return (
  <li key={country.name.common}>
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
            <CountryLi country={country}/>) 
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
