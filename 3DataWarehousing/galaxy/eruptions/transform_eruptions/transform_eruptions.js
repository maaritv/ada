
const fs = require('fs')
let eruptions = require("../../data/eruptions.json")

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


writeFile("eruptions/transform_eruptions/output/eruptions_with_dates_and_locations_and_countries_no_volcano_name.json", eruptions)

function writeFile(name, jsondagta) {
    fs.writeFile('./' + name, JSON.stringify(jsondagta), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("ok!")
        }
    });
}




