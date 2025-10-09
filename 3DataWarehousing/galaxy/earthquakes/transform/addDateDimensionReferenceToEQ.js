const fs = require('fs')
//Generated data, not extracted.
const jsondates = require("../../data/date_dimension.json")

/*
    run in ../galaxy/earthquakes/transform -directory
*/


function findDateIdForDate(sqlFormattedDate) {
    const date = jsondates.find(jdte => jdte.dte === sqlFormattedDate)
    return date ? date.dateId : null   // turva nullille, jos ei löydy
}


function addDateReferenceAndConvertDateFormat(eq) {
    const dateString = eq.date_time.split(" ")[0];
    const dateFields = dateString.split("-")
    const sqlFormattedDate = dateFields[2] + "-" + dateFields[1] + "-" + dateFields[0]
    console.log(sqlFormattedDate)
    const { date_time, ...rest } = eq;  //remove datetime and date in SQL date format 
    return {                           // pitää palauttaa objekti
        ...rest,
        dateId: findDateIdForDate(sqlFormattedDate)
    }
}

//Functional implementation of pipeable function, that can be easily 
//combined to data processing pipeline.

const addDateReferenceToEarthquakes = earthquakes => earthquakes.map(eq => addDateReferenceAndConvertDateFormat(eq));

module.exports = { addDateReferenceToEarthquakes }