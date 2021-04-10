import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => setCountries(res.data)
  )},[])

  const handleChange = (e) => setSearchKey(e.target.value)

  const show = (e) => {
    e.preventDefault()
    setSearchKey(e.target.value)
  }
    
  return (
    <div>
      <Filter handleChange={handleChange} searchKey={searchKey}/>
      <Countries searchKey={searchKey} countries={countries} show={show}/>
    </div>
  )
}
export default App