## Galaxy Schema ETL jobs for Galaxy Schema presenting 
## relations between volcano eruptions and earthquakes.

Data model for data warehouse data analysis based on the hypothesis, that earthquakes are related to volcano eruptions. This data model can be used to
investigate these transactions based on information provided by location, data and country dimensions.

Dimensions are expected to explain the facts (eruptions and earthquakes).

This more advanced data mapping uses artificial joins between tables:

* Earthquake and eruption are related if they are located (locationId surrogate key) near to each other and almost at the same time (date dimension surrogate key).

## Execute each extract and transform phase separately in galaxy -folder

e.g.

````
node eruptions/transform_eruptions/transform_eruptions.js
```
