
const fs = require('fs')
let earthquakes = require("../extract/output/earthquakes.json")

const dateDimension = require('./addDateDimensionReferenceToEQ').addDateReferenceToEarthquakes;
const locationDimension = require('./addLocationDimensionReferenceToEQ').addLocationReferenceToEarthquakes
const countryDimension = require('./addCountryDimensionReferenceToEQ').addCountryReferenceToEarthquakes
const removeEarthquakesWithoutDimensions = require('./cleanEarthquakes').removeEarthquakesWithoutDimensions

earthquakes = locationDimension(earthquakes)
earthquakes = countryDimension(earthquakes)
earthquakes = dateDimension(earthquakes)
earthquakes = removeEarthquakesWithoutDimensions(earthquakes)


console.log(earthquakes)


writeFile("earthquakes/transform/output/earthquakes_with_dates_and_locations_and_countries.json", earthquakes)

function writeFile(name, jsondagta) {
    fs.writeFile('./' + name, JSON.stringify(jsondagta), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("ok!")
        }
    });
}




