const fs = require('fs')
let csvToJson = require('convert-csv-to-json');
// . refers to current working directory
const locationsWithIds = csvToJson.getJsonFromCsv("./data/world_locations.csv")

const locationsWithDetails = csvToJson.getJsonFromCsv("./data/locations_with_details.csv")



function findDescriptionForLocation(location) {

    function locationsMatch(locationWithDetails, locationWithId) {
        if (locationWithDetails.lat == locationWithId.lat && locationWithDetails.long == locationWithId.long) {
            return true;
        }
        else {
            return false;
        }
    }


    const locationWithDetails = locationsWithDetails.find(locWithDetails => locationsMatch(locWithDetails, location))
    if (locationWithDetails) {
        console.log("Add area for the location!")
        location.area = `${locationWithDetails.location} ${locationWithDetails.continent}`
    }
    return location;
}


const locationsWithIdsAndDescription = locationsWithIds.map(location => findDescriptionForLocation(location))
console.log("locations "+locationsWithIdsAndDescription.length)
const onlyLocationsWithIdsAndDescriptions = locationsWithIdsAndDescription.filter(location => location.area)
console.log("only locations "+onlyLocationsWithIdsAndDescriptions.length)
//console.log(JSON.stringify(locationsWithIdsAndDescription))
writeFile('./data/location_dimension.json', onlyLocationsWithIdsAndDescriptions)

function writeFile(name, jsondagta) {
    fs.writeFile('./' + name, JSON.stringify(jsondagta), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("ok!")
        }
    });
}