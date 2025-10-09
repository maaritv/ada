const fs = require('fs')
const earthquakes = require("./earthquakes_with_dates_and_locations.json")

/*
    run in ../galaxy/earthquakes/transform -directory
*/

/*
  Delete earthquakes that can not be 
  related to both location and date 
  dimension.
*/


function earthquakesWithLocationAndDateId(eq) {
  if (!eq || !eq.dateId || !eq.locationId) {
    console.log("not included " + JSON.stringify(eq));
    return null; // palautetaan null selkeyden vuoksi
  } else {
    return eq;
  }
}

// Suodatetaan vain ne, joilla on molemmat id:t
const validEarthquakes = earthquakes
  .map(earthquakesWithLocationAndDateId)
  .filter(Boolean);


console.log("earthquakes to write "+validEarthquakes.length)
writeFile("earthquakes_with_dates_and_locations_validated.json", validEarthquakes)

function writeFile(name, jsondagta) {
    fs.writeFile('./'+name, JSON.stringify(jsondagta), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("ok!")
        }
    });
}



