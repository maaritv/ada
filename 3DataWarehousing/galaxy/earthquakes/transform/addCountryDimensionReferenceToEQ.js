const jsonCountrys = require("../../data/country_dimension.json")

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
const addCountryReferenceToEarthquakes = earthquakes => earthquakes.map(eq => addCountryReference(eq))


module.exports = { addCountryReferenceToEarthquakes }