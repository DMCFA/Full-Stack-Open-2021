import React from 'react'

const Countries = ({searchKey, countries}) => {
    const results = searchKey.length === 1 ? countries : countries.filter(country =>
    country.name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 )

    if (results.length >= 10) {
        return <p>Too many matches, specify another filter</p>

    } else if (results.length < 10 && results.length > 1) {
        return (
            results.map(country =>
                <li style={{listStyle: 'none'}}
                key={country.alpha3Code}>{country.name}</li>)
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
                width='250px'
                height='200px'>
                </img>
                </div>
            ))}
            </div>
        )
}

export default Countries

// const countriesToShow = search ? countries.filter((country) =>
// country.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
// )
// : countries;

    // const results = !searchKey ? countries : countries.filter
    // (country => country.name.toLowerCase().includes(searchKey.toLowerCase()));
    // return (
    //     results.map(country => 
    //         <li style={{listStyle: 'none'}}
    //         key={country.alpha3Code}> {country.name}</li>
    //             )
    // )