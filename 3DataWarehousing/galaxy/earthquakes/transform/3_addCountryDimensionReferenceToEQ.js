const fs = require('fs')
const earthquakes = require("../../data/earthquakes_with_dates_and_locations_validated.json")
const jsonCountrys = require("../../data/all_countries.json")

/*
    run in ../galaxy/earthquakes/transform -directory
*/

function findIdForCountry(x) {
  const country = jsonCountrys.find(country => country.country_name === x)
  return country ? country.country_id : null   // turva nullille, jos ei löydy
}

function addCountryReference(eq) {
  const { country, ...rest } = eq;  // puretaan country pois objektista
  return {
    ...rest,                        // kopioidaan muut kentät
    countryId: findIdForCountry(country)  // lisätään uusi kenttä countryId
  };
}

//console.log(jsonCountrys)
//earthquakes with reference to countryId surrogate key of the schema!
const earthquakes_countrys = earthquakes.map(eq => addCountryReference(eq))
console.log("Found country for "+earthquakes_countrys.length+" countries")
writeFile("./data/earthquakes_with_dates_and_countries.json", earthquakes_countrys)


function writeFile(name, jsondagta) {
    fs.writeFile('./'+name, JSON.stringify(jsondagta), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("ok!")
        }
    });
}



