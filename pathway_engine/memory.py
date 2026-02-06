
def build_context(features_row, anomaly_row):
    return f"""
User ID: {features_row.user_id}
Total spend today: ₹{features_row.total_spend}
Average spend: ₹{features_row.avg_spend}
Transaction count: {features_row.txn_count}
Overspending detected: {anomaly_row.overspending}
"""
