from fastapi import FastAPI
from App.routes.author_route import router as author_router
from App.routes.book_route import router as book_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Book Author API")
origins = [
    "http://localhost:5173",  # Your React dev server
    "https://your-frontend-domain.com"  # Add production frontend later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(author_router)
app.include_router(book_router)

@app.get("/")
def root():
    return {"message": "Welcome to Book Author API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
