import sys
sys.path.append('../..')
import pathway as pw
from data.generators.transaction_stream import stream

def ingest():
    return pw.io.python.read(
        stream,
        schema={
            "txn_id": int,
            "user_id": str,
            "amount": float,
            "category": str,
            "merchant": str,
            "timestamp": str
        }
    )
