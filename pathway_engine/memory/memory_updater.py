from .document_store import store

def update(txns):
    store.add_documents(
        content=txns.category + " at " + txns.merchant,
        metadata={"amount": txns.amount}
    )
