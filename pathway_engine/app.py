import pathway as pw
import time

from pathway_engine.features import compute_spending_features
from pathway_engine.anomalies import detect_overspending


# ---- Simulated transactions ----
transactions = pw.debug.table_from_markdown(
    """
    user_id | amount
    u1      | 200
    u1      | 500
    u1      | 1200
    u1      | 300
"""
)

# ---- Streaming ML features ----
features = compute_spending_features(transactions)

# ---- Real-time anomaly detection ----
anomalies = detect_overspending(features)


# ---- Print alerts ----
def print_alert(row):
    print("🚨 REAL-TIME ALERT:", row)


pw.io.python.write(anomalies, print_alert)

print("✅ Pathway engine started. Waiting for events...")

pw.run(blocking=False)

while True:
    time.sleep(1)
