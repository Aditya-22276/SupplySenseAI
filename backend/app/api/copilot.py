from fastapi import APIRouter
from pydantic import BaseModel

from app.services.copilot_service import (
    ask_copilot
)

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(request: ChatRequest):

    answer = ask_copilot(
        request.question
    )

    return {
        "answer": answer
    }