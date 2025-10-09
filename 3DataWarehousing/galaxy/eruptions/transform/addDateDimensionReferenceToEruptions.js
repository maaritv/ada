
const jsondates = require("../../data/date_dimension.json")


function findIdForDate(d) {
  const str = d.event_date_year + "-" + d.event_date_month + "-" + d.event_date_day;
  const date = jsondates.find(jdte => jdte.dte === str)
  return date ? date.dateId : null   // turva nullille, jos ei löydy
}

function addDateReference(eq) {
  return {                           // pitää palauttaa objekti
    ...eq,
    dateId: findIdForDate(eq)
  }
}

function addDateReferenceToEruptions(eruptions) {
  const eruptions_with_dates = eruptions.map(er => addDateReference(er))
  return eruptions_with_dates;
}

module.exports = { addDateReferenceToEruptions }


