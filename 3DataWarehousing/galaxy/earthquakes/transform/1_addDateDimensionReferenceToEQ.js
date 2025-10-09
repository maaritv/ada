const fs = require('fs')
const earthquakes = require("../extract/output/earthquakes.json")
//Generated data, not extracted.
const jsondates = require("../../dates/extract/output/dates.json")

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

const earthquakes_dates = earthquakes.map(eq => addDateReferenceAndConvertDateFormat(eq))

writeFile("./output/earthquakes_with_dates.json", earthquakes_dates)


function writeFile(name, jsondagta) {
    fs.writeFile('./' + name, JSON.stringify(jsondagta), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("ok!")
        }
    });
}



function clean(text) {
    try {
        let t = text.replace("\"", "")
        t = t.replace("  ", " ")
        t = t.trim()
        return t
    }
    catch (e) {
        return text;
    }
}

