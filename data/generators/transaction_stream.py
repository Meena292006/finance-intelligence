import time
import pandas as pd

df = pd.read_csv("../raw/transactions.csv")

def stream():
    for _, row in df.iterrows():
        yield row.to_dict()
        time.sleep(2)
