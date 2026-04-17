"""
auth.py — Google OAuth endpoints

STUB for Checkpoint 2. Routes are defined but return placeholder responses.
Full implementation comes in CP2.

OAuth flow reminder:
  1. Frontend calls GET /auth/google → we redirect to Google's consent page
  2. User approves → Google redirects to GET /auth/google/callback?code=...
  3. We exchange the `code` for an access token, fetch the user's profile,
     create/find the user in our DB, issue our own JWT, return it.
"""

from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/google")
def google_login():
    """Redirect the user to Google's OAuth consent screen. (CP2)"""
    return {"message": "Google OAuth — coming in Checkpoint 2"}


@router.get("/google/callback")
def google_callback(code: str | None = None):
    """Handle the redirect back from Google with an auth code. (CP2)"""
    return {"message": "Google callback — coming in Checkpoint 2", "code": code}
