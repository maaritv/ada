
const fs = require('fs')
let earthquakes = require("../extract/output/earthquakes.json")

//TODO: Ask from AI what is this.
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const dateDimension = require('./addDateDimensionReferenceToEQ').addDateReferenceToEarthquakes;
const locationDimension = require('./addLocationDimensionReferenceToEQ').addLocationReferenceToEarthquakes
const countryDimension = require('./addCountryDimensionReferenceToEQ').addCountryReferenceToEarthquakes
const removeEarthquakesWithoutDimensions = require('./cleanEarthquakes').removeEarthquakesWithoutDimensions

/*earthquakes = locationDimension(earthquakes)
earthquakes = countryDimension(earthquakes)
earthquakes = dateDimension(earthquakes)
earthquakes = removeEarthquakesWithoutDimensions(earthquakes)
*/

const transformedEarthquakes = pipe(locationDimension, countryDimension, dateDimension)(earthquakes)

console.log(transformedEarthquakes)


writeFile("earthquakes/transform/output/earthquake_fact.json", transformedEarthquakes)

function writeFile(name, jsondagta) {
    fs.writeFile('./' + name, JSON.stringify(jsondagta), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("ok!")
        }
    });
}



