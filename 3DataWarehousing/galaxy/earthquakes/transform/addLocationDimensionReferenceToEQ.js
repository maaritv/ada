
const jsonLocations = require('../../data/location_dimension.json')

/*
    run in ../galaxy/earthquakes/transform -directory
*/


/**
 * Earthquake has latitude and longitude fields from 
 * which location string must be transformed to match
 * location_name in location dimension for getting 
 * surrogate key reference.
 * @param {earthquake} earthquake 
 * @returns 
 */

function findIdForLocation(earthquake) {

  function getLocationStringFromEQ(eq) {
    console.log(eq.latitude + " " + eq.longitude)

    if (eq.latitude && eq.longitude) {
      const latitude = eq.latitude+""
      const longitude = eq.longitude+""
      //console.log("latitude and longitude as strings "+latitude + ", " + longitude)
      const lat = latitude.substring(0, latitude.indexOf("."))
      const long = longitude.split(".")[0]
      const locationString = lat + ", " + long;
      //console.log("location string for mapping: " + locationString)
      return locationString;
    }
  }
  const eqLocationName = getLocationStringFromEQ(earthquake)
  const location = jsonLocations.find(jdte => jdte.location_name === eqLocationName)
  return location ? location.location_key : null   // turva nullille, jos ei löydy
}

function addLocationReference(eq) {
  console.log(eq)
  const locationStr = eq.lat + ", " + eq.long;   //Note one enmpty space !
  console.log(locationStr)
  return {                           // return the eq object after locationId field is added!
    ...eq,
    locationId: findIdForLocation(eq)
  }
}

const addLocationReferenceToEarthquakes = earthquakes => earthquakes.map(eq => addLocationReference(eq));

module.exports = { addLocationReferenceToEarthquakes }