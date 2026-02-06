import pathway as pw


def detect_overspending(features: pw.Table) -> pw.Table:
    return features.select(
        features.user_id,
        overspending=features.total_spend > (features.avg_spend * 1.8),
    )
