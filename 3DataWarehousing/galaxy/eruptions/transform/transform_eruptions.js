
const fs = require('fs')
let eruptions = require("../extract/output/eruptions.json")

const dateDimension = require('./addDateDimensionReferenceToEruptions').addDateReferenceToEruptions;
const locationDimension = require('./addLocationDimensionReferenceToEruptions').addLocationReferenceToEruptions
const countryDimension = require('./addCountryDimensionReferenceToEruption').addCountryReferenceToEruptions

const removeEruptionsWithoutDimensions = require('./cleanEruptions').removeEruptionsWithoutDimensions
const removeVolcanoNameFromEruption = require('./cleanEruptions').removeVolcanoNameFromDimension

eruptions = locationDimension(eruptions)
eruptions = countryDimension(eruptions)
eruptions = dateDimension(eruptions)
eruptions  = removeVolcanoNameFromEruption(eruptions)
eruptions = removeEruptionsWithoutDimensions(eruptions)


console.log(eruptions)


writeFile("eruptions/transform/output/eruption_fact.json", eruptions)

function writeFile(name, jsondagta) {
    fs.writeFile('./' + name, JSON.stringify(jsondagta), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("ok!")
        }
    });
}




