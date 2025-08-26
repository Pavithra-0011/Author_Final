from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from App.routes.author_route import router as author_router
from App.routes.book_route import router as book_router
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# import openai
from App.config import OPENAI_API_KEY

app = FastAPI(title="Book Author API")

# --- CORS setup ---
# origins = [
#     "http://localhost:5173",
#     "http://localhost:5174",
#     "http://localhost:5175",
#     "https://author-final-8kqi.vercel.app",
#     "https://author-book-rj6o.vercel.app",
# ]

origins = [
    "*"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files (uploads)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Routers
app.include_router(author_router)
app.include_router(book_router)

# Set OpenAI API key
# openai.api_key = OPENAI_API_KEY

@app.get("/")
def root():
    return {"message": "Welcome to Book Author API"}

# --- Pydantic models ---
class Book(BaseModel):
    title: str
    author: str
    genre: str = None
    price: float = None
    description: str = None

class BookRequest(BaseModel):
    title: str
    genre: str

# --- POST route for frontend submission ---
@app.post("/submit")
async def submit_book(book: Book):
    return {"message": "Book submitted successfully", "data": book}

# --- Generate AI description ---
# @app.post("/generate-description")
# async def generate_description(book: BookRequest):
#     try:
#         response = openai.chat.completions.create(
#             model="gpt-4o-mini",  # or "gpt-4o" if you have access
#             messages=[
#                 {"role": "system", "content": "You are a creative book blurb generator."},
#                 {"role": "user", "content": f"Generate an engaging book description for a {book.genre} book titled '{book.title}'."}
#             ],
#             max_tokens=150
#         )
#         description = response.choices[0].message.content
#         return {"description": description}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# --- Run server locally ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
