

/*
  Delete earthquakes that can not be 
  related to both location and date 
  dimension.
*/

function earthquakesWithLocationAndDateIdAndCountry(eq) {
  if (!eq || !eq.dateId || !eq.locationId || !eq.countryId) {
    console.log("not included " + JSON.stringify(eq));
    return null; // palautetaan null selkeyden vuoksi
  } else {
    return eq;
  }
}

// Suodatetaan vain ne, joilla on molemmat id:t
const removeEarthquakesWithoutDimensions = earthquakes => 
  earthquakes.map(earthquakesWithLocationAndDateIdAndCountry)
  .filter(Boolean);

module.exports = { removeEarthquakesWithoutDimensions }