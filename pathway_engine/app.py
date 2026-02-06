import pathway as pw
<<<<<<< HEAD
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
=======

from ingestion.simulated_stream import ingest
from features.spending_features import spending_features
from models.anomaly_rules import detect_anomaly
from memory.memory_updater import update
from triggers.alert_triggers import alert_if

txns = ingest()
update(txns)

features = spending_features(txns)
anomalies = detect_anomaly(features)
alerts = alert_if(anomalies)

pw.io.python.write(alerts, lambda r: print("🚨 ALERT:", r))
pw.run()
>>>>>>> 4d79eb45014536949b16abfa078e16aba92c86c1
