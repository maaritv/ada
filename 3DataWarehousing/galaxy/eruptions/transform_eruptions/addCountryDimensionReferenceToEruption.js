const fs = require('fs')
let csvToJson = require('convert-csv-to-json');
// . refers to current working directory
const volcanos = csvToJson.getJsonFromCsv("./data/volcanos.csv")
// . refers to the addCountryDimension.js (this file) file location.
const jsonCountrys = require("../../data/all_countries.json")


//Should be executed in GALAXY-folder. directoris are proportional to it.

function findIdForCountry(x) {
  //console.log(x)
  const country = jsonCountrys.find(country => country.country_name === x)
  return country ? country.country_id : null   // turva nullille, jos ei löydy
}

function addCountryReference(eruption) {
  // console.log("adding country reference for eruption"+JSON.stringify(eruption))
  const volcano_number = eruption.volcano_number;
  const country = volcanos.find(volcano => volcano.volcano_number == volcano_number);
  if (country==null) {
    //If eruptions does not have country specified, return original 
    //eruption without the country.
    return eruption;
  }
  const country_name = country.country;
  //console.log("now country name " + JSON.stringify(country_name))
  const eruption_copy = { ...eruption }
  eruption_copy.countryId = findIdForCountry(country_name)
  return eruption_copy;
}

function addCountryReferenceToEruptions(eruptions) {
  //console.log(jsonCountrys)
  //eruptions with reference to countryId surrogate key of the schema!
  const eruptions_countrys = eruptions.map(eruption => addCountryReference(eruption))
  const eruptions_with_countries = eruptions_countrys.filter(eruption => eruption.countryId !== null)
  return eruptions_with_countries;
}


function writeToFile(eruptions) {
  console.log("Found country for " + eruptions.length + " countries")
  writeFile("./data/eruptions_with_dates_and_locations_and_countries.json", eruptions)


  function writeFile(name, jsondagta) {
    fs.writeFile('./' + name, JSON.stringify(jsondagta), err => {
      if (err) {
        console.error(err);
      } else {
        console.log("ok!")
      }
    });
  }
}

module.exports = { addCountryReferenceToEruptions }


