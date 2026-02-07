import time
import pandas as pd
import os

# Get the directory of the current file
current_dir = os.path.dirname(os.path.abspath(__file__))
# Go up to the project root (data/ parent is the root)
project_root = os.path.dirname(current_dir)
# Go up one more level to the actual project root
project_root = os.path.dirname(project_root)
csv_path = os.path.join(project_root, "data", "raw", "transactions.csv")

df = pd.read_csv(csv_path)

def stream():
    for _, row in df.iterrows():
        yield row.to_dict()
        time.sleep(2)
