# Integration Plan for Frontend and Backend

## Steps to Complete:
- [x] Add CORS middleware to api_gateway/server.py to allow frontend access from http://localhost:5174.
- [ ] Update api_gateway/routes/insights.py to read and return transaction data from data/raw/transactions.csv.
- [ ] Update api_gateway/routes/alerts.py to return sample alerts based on transaction data.
- [ ] Enhance api_gateway/routes/chat.py to include transaction context in LLM responses.
- [ ] Test APIs with test_api.py.
- [ ] Run frontend and verify data fetching.
- [ ] Integrate pathway_engine for live alerts if required.

## Dependent Files to be edited:
- api_gateway/server.py
- api_gateway/routes/insights.py
- api_gateway/routes/alerts.py
- api_gateway/routes/chat.py

## Followup steps:
- Verify frontend displays data correctly.
- Ensure chatbot responds with transaction insights.
