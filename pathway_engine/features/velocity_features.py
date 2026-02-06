def velocity_features(txns):
    return txns.groupby(txns.user_id).reduce(
        spend_velocity=pw.reducers.sum(txns.amount)
    )
