# App/routes/ai_route.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/ai", tags=["AI"])


class BookPrompt(BaseModel):
    title: str
    genre: str

@router.post("/generate-description")
async def generate_description(payload: BookPrompt):
    try:
        prompt = (
            f"Write a short, engaging book description (80–120 words) "
            f"for a book titled '{payload.title}' in the '{payload.genre}' genre. "
            "Use a friendly, vivid tone and avoid spoilers."
        )

        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You write compelling book blurbs."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=180,
            temperature=0.8,
        )

        description = resp.choices[0].message.content.strip()
        return {"description": description}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
