from fastapi import FastAPI
from App.routes.author_route import router as author_router
from App.routes.book_route import router as book_router
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Book Author API")

# --- CORS setup ---
origins = [
    "http://localhost:5173",
    "https://author-book-rj6o.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include routers ---
app.include_router(author_router)
app.include_router(book_router)

# --- Root route ---
@app.get("/")
def root():
    return {"message": "Welcome to Book Author API"}

# --- Pydantic model for book submission ---
class Book(BaseModel):
    title: str
    author: str
    genre: str = None
    price: float = None
    description: str = None

# --- POST route for frontend submission ---
@app.post("/submit")
async def submit_book(book: Book):
    return {"message": "Book submitted successfully", "data": book}

# --- Run server locally ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
