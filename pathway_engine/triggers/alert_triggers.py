def alert_if(anomalies):
    return anomalies.filter(anomalies.anomaly == True)
