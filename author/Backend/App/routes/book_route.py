from fastapi import APIRouter, HTTPException
from App.crud import create_book, get_books

router = APIRouter(prefix="/books", tags=["Books"])

@router.post("/")
def add_book(book: dict):
    try:
        created_book = create_book(book)
        return {"message": "Book created successfully", "book": created_book}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/")
def fetch_books():
    try:
        books = get_books()
        return {"books": books}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
