from pyspark.sql import SparkSession
from pyspark.sql.functions import col, coalesce, lit, sum as _sum

spark = SparkSession.builder \
    .appName("BatchAndStreamingExample") \
    .master("local[*]") \
    .getOrCreate()

# 1. Read historical batch data and remove duplicate transactions
batch_df = spark.read.csv(
    "./data/slow/sales_history.csv",
    header=True,
    inferSchema=True
)

batch_unique = batch_df.dropDuplicates(["transaction_id"])

batch_agg = batch_unique.groupBy("product").agg(
    _sum("amount").alias("historical_sales")
)

# 2. Read streaming data and remove duplicate transactions
stream_df = spark.readStream \
    .format("json") \
    .schema(
        "transaction_id STRING, product STRING, "
        "amount DOUBLE, timestamp STRING"
    ) \
    .option("cleanSource", "delete") \
    .load("./data/fast/")

stream_unique = stream_df.dropDuplicates(["transaction_id"])

stream_agg = stream_unique.groupBy("product").agg(
    _sum("amount").alias("stream_sales")
)

# 3. Join results and calculate total sales
joined = stream_agg.join(batch_agg, on="product", how="left") \
    .withColumn(
        "total_sales",
        coalesce(col("historical_sales"), lit(0))
        + coalesce(col("stream_sales"), lit(0))
    )

# 4. Write results to console
query = joined.writeStream \
    .outputMode("complete") \
    .format("console") \
    .option("truncate", False) \
    .start()

query.awaitTermination()