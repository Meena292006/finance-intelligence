def detect_anomaly(features):
    return features.select(
        features.user_id,
        anomaly=features.total_spend > (features.avg_spend * 2)
    )
