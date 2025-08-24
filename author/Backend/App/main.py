from fastapi import FastAPI
from App.routes.author_route import router as author_router
from App.routes.book_route import router as book_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Book Author API")

app.include_router(author_router)
app.include_router(book_router)

@app.get("/")
def root():
    return {"message": "Welcome to Book Author API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)