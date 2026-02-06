def risk_score(features):
    return features.select(
        features.user_id,
        risk=(features.total_spend / (features.txn_count + 1))
    )
