from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum as _sum

## run: pip install pyspark
## tai
## pip3 install pyspark
## execute: python tai python3 processDataLambda.py

spark = SparkSession.builder \
    .appName("BatchAndStreamingExample") \
    .master("local[*]") \
    .getOrCreate()

# --------------------------
# 1. Read batch (historical) data
# --------------------------
batch_df = spark.read.csv("./data/slow/sales_history.csv", header=True, inferSchema=True)

# Aggregate historical data
batch_agg = batch_df.groupBy("product").agg(
    _sum("amount").alias("historical_sales")
)

# --------------------------
# 2. Read streaming (real time)
# --------------------------
stream_df = spark.readStream \
    .format("json") \
    .schema("product STRING, amount DOUBLE, timestamp STRING") \
    .load("./data/fast/")

# Aggregate streaming data
stream_agg = stream_df.groupBy("product").agg(
    _sum("amount").alias("stream_sales")
)

# --------------------------
# 3. Join streaming results with historical batch
# --------------------------
joined = stream_agg.join(batch_agg, on="product", how="left")

# --------------------------
# 4. Write results to console (demo)
# --------------------------
query = joined.writeStream \
    .outputMode("complete") \
    .format("console") \
    .option("truncate", False) \
    .start()

query.awaitTermination()
