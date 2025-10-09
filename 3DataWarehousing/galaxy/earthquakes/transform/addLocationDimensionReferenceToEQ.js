
const jsonLocations = require('../../data/location_dimension.json')

/*
    run in ../galaxy/earthquakes/transform -directory
*/

function findIdForLocation(x) {
  const location = jsonLocations.find(jdte => jdte.location_name === x)
  return location ? location.location_key : null   // turva nullille, jos ei löydy
}

function addLocationReference(eq) {
  console.log(eq)
  const locationStr=eq.lat+", "+eq.long;   //Note one enmpty space !
  console.log(locationStr)
  return {                           // return the eq object after locationId field is added!
    ...eq,
    locationId: findIdForLocation(locationStr)
  }
}

const addLocationReferenceToEarthquakes = earthquakes => earthquakes.map(eq => addLocationReference(eq));

module.exports = { addLocationReferenceToEarthquakes }