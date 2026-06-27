from datetime import datetime, timedelta


def get_notifications():

    now = datetime.now()

    notifications = [

        {
            "id": 1,
            "title": "Inventory Below Reorder Level",
            "message": "Product A stock has fallen below the reorder threshold.",
            "type": "critical",
            "icon": "package",
            "time": (now - timedelta(minutes=5)).isoformat(),
            "read": False
        },

        {
            "id": 2,
            "title": "Supplier Delivery Delayed",
            "message": "ABC Supplier shipment delayed by 2 days.",
            "type": "warning",
            "icon": "truck",
            "time": (now - timedelta(minutes=20)).isoformat(),
            "read": False
        },

        {
            "id": 3,
            "title": "Demand Forecast Updated",
            "message": "Demand is expected to increase by 18% next week.",
            "type": "info",
            "icon": "chart",
            "time": (now - timedelta(hours=2)).isoformat(),
            "read": False
        },

        {
            "id": 4,
            "title": "AI Recommendation",
            "message": "Retrain forecasting models for improved accuracy.",
            "type": "ai",
            "icon": "bot",
            "time": (now - timedelta(hours=5)).isoformat(),
            "read": True
        },

        {
            "id": 5,
            "title": "Executive Report Generated",
            "message": "Scheduled executive PDF report completed successfully.",
            "type": "success",
            "icon": "file",
            "time": (now - timedelta(days=1)).isoformat(),
            "read": True
        }

    ]

    return notifications


def unread_notifications():

    notifications = get_notifications()

    return [

        n

        for n in notifications

        if not n["read"]

    ]