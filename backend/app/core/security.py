"""
security.py — JWT helpers

JWTs (JSON Web Tokens) are how we prove a user is logged in without
hitting the database on every request.

Flow:
  1. User logs in via Google OAuth
  2. We create a JWT containing their user_id and expiry → send it to frontend
  3. Frontend attaches JWT in every request header: Authorization: Bearer <token>
  4. We verify the JWT signature here — if valid, we know who the user is

Why python-jose?
  Standard, well-maintained JWT library for Python. Handles signing (HS256)
  and expiry automatically.
"""

from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import settings

# Algorithm used to sign the JWT. HS256 = HMAC + SHA-256.
# The SECRET_KEY is the only thing that can produce or verify these signatures.
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# FastAPI security scheme — extracts "Bearer <token>" from the Authorization header
bearer_scheme = HTTPBearer()


def create_access_token(user_id: str) -> str:
    """
    Create a signed JWT containing the user's ID.
    The token expires after ACCESS_TOKEN_EXPIRE_MINUTES.
    """
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": user_id,   # "sub" is the standard JWT claim for subject (who this token is for)
        "exp": expire,
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str) -> str:
    """
    Decode and validate a JWT. Returns the user_id ("sub" claim) if valid.
    Raises HTTPException 401 if the token is invalid or expired.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return user_id
    except JWTError:
        raise credentials_exception


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> str:
    """
    FastAPI dependency that extracts and validates the JWT from the request header.
    Use this on any route that requires authentication:

        @router.get("/protected")
        def protected_route(user_id: str = Depends(get_current_user_id)):
            ...
    """
    return verify_token(credentials.credentials)
