import pandas as pd
import json


def read_json_file_to_pd(file_name):
    with open(file_name, "r") as f:
        data_list = json.load(f)

    df = pd.DataFrame(data_list)
    return df

# Convert to dataframes

df_old = read_json_file_to_pd('./bookdata/booksold.json') # Data currently in raw data layer, staging area or similar
df_new = read_json_file_to_pd('./bookdata/booksnew.json') # Data in source database table

# Find records in new_data that are not in old_data
# use primary key, because it does not change for the
# object.
# SCD type 0 -> add new records do not update changed
# records.
df_diff = df_new[~df_new["id"].isin(df_old["id"])]

print(f"Do incremental load with only {len(df_diff)} rows.")
print(df_diff)

