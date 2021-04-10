import React from 'react'
import Weather from './Weather'

const Countries = ({searchKey, countries, show}) => {

    const results = searchKey.length === 1 ? countries : countries.filter(country =>
    country.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 )

    if (results.length === 0) {
        return <p>No matches found</p>

    } else if (results.length >= 10) {
        return <p>Too many matches, specify another filter</p>

    } else if (results.length < 10 && results.length > 1) {
        return (
            results.map(country =>
                <li style={{listStyle: 'none', paddingTop: '10px'}}
                key={country.alpha3Code}>{country.name}
                <button style={{margin: '5px'}} value={country.name} onClick={show}>show</button></li>)
        )

    } else if (results.length === 1) {
    
    }
        return (
            <div>
            {results.map(country => (
                <div style={{listStyle: 'none', border: '5px'}}
                key={country.alpha3Code}>
                <h1>{country.name}</h1>
                <p style={{margin:"10px 5px"}}>capital {country.capital}</p>
                <p style={{margin:"10px 5px"}}>population {country.capital}</p>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(lan =>
                    <li key={lan.name}>{lan.name}</li>
                    )}
                </ul>
                <img
                src={country.flag}
                alt='national flag'
                width='150px'
                height='100px'>
                </img>
                <Weather capital={country.capital} />
                </div>
            ))}
            </div>
        )
}

export default Countries