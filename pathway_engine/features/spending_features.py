import pathway as pw

def spending_features(txns):
    return txns.groupby(txns.user_id).reduce(
        total_spend=pw.reducers.sum(txns.amount),
        avg_spend=pw.reducers.mean(txns.amount),
        txn_count=pw.reducers.count()
    )
