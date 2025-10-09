let csvToJson = require('convert-csv-to-json');
const fs = require('fs')
const earthquakes = require("./output/earthquakes_with_dates.json")
const jsonLocations = csvToJson.getJsonFromCsv("./data/world_locations.csv")

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

//console.log(jsonLocations)
//earthquakes with reference to locationId surrogate key of the schema!
const earthquakes_locations = earthquakes.map(eq => addLocationReference(eq))

writeFile("earthquakes_with_dates_and_locations.json", earthquakes_locations)
writeFile("locations.json", jsonLocations)

function writeFile(name, jsondagta) {
    fs.writeFile('./'+name, JSON.stringify(jsondagta), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("ok!")
        }
    });
}



