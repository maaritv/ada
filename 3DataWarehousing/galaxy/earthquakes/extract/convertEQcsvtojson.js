let csvToJson = require('convert-csv-to-json');
const fs = require('fs')

/*
    Extract earthquakes after year 1500.
    Skip data without date or before 1500.
*/


function isAfter1500(eq){
    if (!eq.date_time || eq.date_time.indexOf==" "==-1){
      return false;
    }
    else {
        //17-09-2022 13:41
        const year = eq.date_time.split("-")[2].split(" ")[0];
        try {
            if (parseInt(year)>=1500){
                return true;
            }
            else {
                return false;
            }
        }
        catch (e){
            //Could not parse date year
            //skip
            return false;
        }
    }
    return false;
}

const json = csvToJson.getJsonFromCsv("./rawdata/earthquakes_raw.csv");
const after1500 = json.filter(eq=> isAfter1500(eq))

const numbersConverted = after1500.map((item, index) => convertNumbers(index,item))


fs.writeFile('./earthquakes/extract/output/earthquakes.json', JSON.stringify(numbersConverted), err => {
    if (err) {
        console.error(err);
    } else {
        console.log("ok!")
    }
});

for (let i = 0; i < 300; i++) {
    try {
        console.log(json[i]);
    }
    catch (e) {
        console.log(json[i] + " was not added")
    }
}

function clean(text) {
    try {
        let t = text.replace("\"", "")
        t = t.replace("  ", " ")
        t = t.trim()
        return t
    }
    catch (e){
        return text;
    }
}

function convertNumbers(id, jsoneq) {
    console.log(id)
    jsoneq.id=id;
    jsoneq.title = clean(jsoneq.title)
    if (!isNaN(parseFloat(jsoneq.magnitude))) {
        jsoneq.magnitude = clean(jsoneq.magnitude)
    }
    jsoneq.date_time = clean(jsoneq.date_time)
    jsoneq.cdi = clean(jsoneq.cdi)
    if (!isNaN(parseInt(jsoneq.mmi))) {
        jsoneq.mmi = jsoneq.mmi
    }
    jsoneq.alert = clean(jsoneq.alert)
    jsoneq.tsunami = clean(jsoneq.tsunami)
    if (!isNaN(parseInt(jsoneq.eqsig))) {
        jsoneq.eqsig = jsoneq.eqsig
    }
    if (!isNaN(parseInt(jsoneq.net))) {
        jsoneq.net = jsoneq.net
    }
    jsoneq.nst = jsoneq.nst
    if (!isNaN(parseInt(jsoneq.dmin))) {
        jsoneq.dmin = jsoneq.dmin
    }
    if (!isNaN(parseInt(jsoneq.gap))) {
        jsoneq.gap = jsoneq.gap
    }
    if (!isNaN(parseInt(jsoneq.magType))) {
        jsoneq.magType = jsoneq.magType
    }
    jsoneq.depth = clean(jsoneq.depth)
    if (!isNaN(parseFloat(jsoneq.latitude))) {
        jsoneq.latitude = parseFloat(jsoneq.latitude)
    }
    if (!isNaN(parseFloat(jsoneq.longitude))) {
        jsoneq.longitude = parseFloat(jsoneq.longitude)
    }
    if (!isNaN(parseFloat(jsoneq.location))) {
        jsoneq.location = parseFloat(jsoneq.location)
    }
    if (!isNaN(parseFloat(jsoneq.lat))) {
        jsoneq.lat = parseFloat(jsoneq.lat)
    }
    if (!isNaN(parseFloat(jsoneq.long))) {
        jsoneq.long = parseFloat(jsoneq.long)
    }

    jsoneq.continent = clean(jsoneq.continent)
    jsoneq.country = clean(jsoneq.country)
    return jsoneq
}