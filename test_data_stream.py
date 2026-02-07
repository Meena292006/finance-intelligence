from data.generators.transaction_stream import stream

# Test the data stream
print("Testing data stream...")
for i, txn in enumerate(stream()):
    print(f"Transaction {i+1}: {txn}")
    if i >= 4:  # Print first 5 transactions
        break
print("Data stream test completed.")
