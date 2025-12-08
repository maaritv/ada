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

````

The data, used by this the learning material, is derived from the following sources:

- Earthquake data: https://www.kaggle.com/datasets/warcoder/earthquake-dataset (Public Domain)
- Eruptions: https://www.kaggle.com/datasets/rupindersinghrana/database-of-volcanic-eruptions (Apache 2)
- Volcanos:  Global Volcanism Program, 2025. [Database] Volcanoes of the World (v. 5.3.3; 26 Nov 2025). Distributed by Smithsonian Institution, compiled by Venzke, E. https://doi.org/10.5479/si.GVP.VOTW5-2025.5.3

