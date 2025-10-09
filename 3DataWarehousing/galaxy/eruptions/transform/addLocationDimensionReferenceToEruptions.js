
const jsonLocations = require('../../data/location_dimension.json')
let csvToJson = require('convert-csv-to-json');
const jsonVolcanos = csvToJson.getJsonFromCsv("./data/volcano_dimension.csv")

//console.log(jsonVolcanos)

function findIdForLocation(x) {
  //console.log("Find location id for location " + x)
  const location = jsonLocations.find(jdte => jdte.location_name === x)
  return location ? location.location_key : null   // turva nullille, jos ei löydy
}

//Because eruption refers to location via volcano (mormalized transaction data), 
// we must lookup the 
//location lat and long from volcano joining eruption with a 
//volcano using volcano_number
function addLocationReference(eruption) {

  //console.log(eruption)
  const volcano = findVolcanoForEruption(eruption)
  if (volcano == null) {
    //if volcano can not be found, do not enrich
    //eruption
    return eruption;
  }
  //console.log("volcano")
  //console.log(volcano)
  const locationStr = volcano.lat + ", " + volcano.long;   //Note one enmpty space !
  //console.log(locationStr)
  return {                           // return the eq object after locationId field is added!
    ...eruption,
    locationId: findIdForLocation(locationStr)
  }
}

function doesVolcanoAndEruptionMatch(v, e) {
  if (v.volcano_number == e.volcano_number) {
    return v;
  }
  else {
    return null;
  }
}

function findVolcanoForEruption(eruption) {
  const volcano = jsonVolcanos.find(volcano => doesVolcanoAndEruptionMatch(volcano, eruption))
  if (volcano == null) {
    return null;
  }
  //console.log("Found volcano " + JSON.stringify(volcano))
  //console.log("for eruption " + JSON.stringify(eruption))
  return volcano;
}

function addLocationReferenceToEruptions(eruptions) {
  const eruptions_with_locations = eruptions.map(eq => addLocationReference(eq))
  return eruptions_with_locations;
}


module.exports = { addLocationReferenceToEruptions }


