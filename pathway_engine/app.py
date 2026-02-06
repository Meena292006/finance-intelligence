import pathway as pw

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
