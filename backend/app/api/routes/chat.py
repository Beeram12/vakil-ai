"""
chat.py — Chat & conversation history endpoints

STUB for Checkpoint 6. Routes are defined so the app structure is in place.
Full streaming RAG + LangGraph implementation comes in CP6.
"""

from fastapi import APIRouter, Depends

from app.core.security import get_current_user_id

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/new")
def new_conversation(user_id: str = Depends(get_current_user_id)):
    """Create a new conversation thread. (CP6)"""
    return {"message": "New conversation — coming in Checkpoint 6", "user_id": user_id}


@router.post("")
def send_message(user_id: str = Depends(get_current_user_id)):
    """Send a message and receive a streamed AI response. (CP6)"""
    return {"message": "Chat — coming in Checkpoint 6"}


@router.get("/history/{thread_id}")
def get_history(thread_id: str, user_id: str = Depends(get_current_user_id)):
    """Return message history for a conversation. (CP6)"""
    return {"message": "History — coming in Checkpoint 6", "thread_id": thread_id}
