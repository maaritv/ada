## Galaxy Schema ETL jobs for Galaxy Schema presenting relations between volcano eruptions and earthquakes.

Data model for data warehouse data analysis based on the assumption, that earthquakes are related to volcano eruptions. This data model can be used to
investigate these transactions based on information provided by location, data and country dimensions.

Dimensions are expected to explain the facts (eruptions and earthquakes).

This more advanced data mapping uses artificial joins between tables. Simplified analysis is carried using data warehouse data model that maps eruptions and earthquakes to same date and location dimensions.

* Earthquake and eruption are related if they are located (latitude and longitude and are approximate equal) near to each other and almost at the same time (same day).

## Execute each extract and transform phase separately in galaxy -folder

e.g.

````
node eruptions/transform_eruptions/transform_eruptions.js

```
