


function hasLocationDateAndCountry(eq) {
  if (!eq || !eq.dateId || !eq.locationId) {
    console.log("not included " + JSON.stringify(eq));
    return false; // palautetaan null selkeyden vuoksi
  } else {
    return true;
  }
}

function removeEruptionsWithoutDimensions(eruptions) {
  // Suodatetaan vain ne, joilla on molemmat id:t
  const validEruptions = eruptions.filter(eruption => hasLocationDateAndCountry(eruption))
  return validEruptions;
}


function removeVolcanoName(eruption) {
  const { volcano_name, ...rest } = eruption;  // puretaan volcano_name pois objektista
  const newVolcanoObject = {
    ...rest
  };
  console.log(newVolcanoObject)
  return newVolcanoObject;
}


function removeVolcanoNameFromDimension(eruptions) {
  const eruptiosWithoutNameField = eruptions.map(eruption => removeVolcanoName(eruption))
  return eruptiosWithoutNameField;
}


module.exports = { removeEruptionsWithoutDimensions, removeVolcanoNameFromDimension }
