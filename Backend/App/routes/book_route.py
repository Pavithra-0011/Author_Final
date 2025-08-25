from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from App.crud import create_book, get_books
import shutil
import os
from uuid import uuid4

router = APIRouter(prefix="/books", tags=["Books"])

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/")
def add_book(
    title: str = Form(...),
    author: str = Form(...),
    genre: str = Form(...),
    price: float = Form(...),
    description: str = Form(...),
    pdf_file: UploadFile = File(...)
):
    try:
        
        if not pdf_file.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")

        
        filename = f"{uuid4()}_{pdf_file.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(pdf_file.file, f)

        book_data = {
            "title": title,
            "author": author,
            "genre": genre,
            "price": price,
            "description": description,
            "pdf_filename": filename,
            "pdf_url": f"/uploads/{filename}"
        }

        created_book = create_book(book_data)
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
