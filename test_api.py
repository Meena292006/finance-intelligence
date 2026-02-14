import requests
import json

BASE_URL = "http://127.0.0.1:8000"


def test_chat():
    """Test personalized AI chat"""
    url = f"{BASE_URL}/chat"

    data = {
        "message": "How is my spending habit? Give me advice.",
        "user_id": "u1"   # ← IMPORTANT: matches CSV user_id
    }

    try:
        response = requests.post(url, json=data)

        print("\n===== CHAT TEST =====")
        print("Chat endpoint:", response.status_code)

        if response.headers.get("content-type", "").startswith("application/json"):
            print("Response:", json.dumps(response.json(), indent=2))
        else:
            print("Raw response:", response.text)

    except Exception as e:
        print("Chat error:", e)


def test_alerts():
    """Test alerts endpoint"""
    url = f"{BASE_URL}/alerts"

    try:
        response = requests.get(url)

        print("\n===== ALERTS TEST =====")
        print("Alerts endpoint:", response.status_code)

        if response.headers.get("content-type", "").startswith("application/json"):
            print("Response:", json.dumps(response.json(), indent=2))
        else:
            print("Raw response:", response.text)

    except Exception as e:
        print("Alerts error:", e)


def test_insights():
    """Test insights endpoint"""
    url = f"{BASE_URL}/insights"

    try:
        response = requests.get(url)

        print("\n===== INSIGHTS TEST =====")
        print("Insights endpoint:", response.status_code)

        if response.headers.get("content-type", "").startswith("application/json"):
            print("Response:", json.dumps(response.json(), indent=2))
        else:
            print("Raw response:", response.text)

    except Exception as e:
        print("Insights error:", e)


if __name__ == "__main__":
    print("\n🚀 Running API Tests...\n")

    test_chat()
    test_alerts()
    test_insights()

    print("\n✅ Testing complete.\n")
