import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response)
      })
  }, [])
  
  const result = countries.data['name'].filter(country => country.toLowerCase().includes(newCountry.toLowerCase()))
  console.log(result);

  // console.log(countries);

  const handleChange = (e) => setNewCountry(e.target.value)

  return (
    <div>
      find countries
      <form /*onSubmit={addCountry}*/ style={{display: 'inline-block'}}>
        <input value={newCountry}
        onChange={handleChange}/>
      </form>
    </div>
  );
}

export default App;
