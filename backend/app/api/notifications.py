from fastapi import APIRouter

from app.services.notification_service import (
    get_notifications,
    unread_notifications
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get("/")
def all_notifications():

    return get_notifications()


@router.get("/unread")
def unread():

    return unread_notifications()


@router.post("/read/{notification_id}")
def mark_as_read(notification_id: int):

    return {
        "status": "success",
        "message": f"Notification {notification_id} marked as read."
    }


@router.post("/read-all")
def mark_all_read():

    return {
        "status": "success",
        "message": "All notifications marked as read."
    }