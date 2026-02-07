import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_chat():
    url = f"{BASE_URL}/chat"
    data = {"message": "Hello, how are you?"}
    try:
        response = requests.post(url, json=data)
        print(f"Chat endpoint: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Chat error: {e}")

def test_alerts():
    url = f"{BASE_URL}/alerts"
    try:
        response = requests.get(url)
        print(f"Alerts endpoint: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Alerts error: {e}")

def test_insights():
    url = f"{BASE_URL}/insights"
    try:
        response = requests.get(url)
        print(f"Insights endpoint: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Insights error: {e}")

if __name__ == "__main__":
    test_chat()
    test_alerts()
    test_insights()
