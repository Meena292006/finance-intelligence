import pathway as pw


def compute_spending_features(transactions: pw.Table) -> pw.Table:
    return transactions.groupby(transactions.user_id).reduce(
        total_spend=pw.reducers.sum(transactions.amount),
        avg_spend=pw.reducers.mean(transactions.amount),
        txn_count=pw.reducers.count(),
    )
