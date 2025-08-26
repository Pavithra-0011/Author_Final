from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from App.crud import create_book, get_books
import shutil
import os
from uuid import uuid4
import base64  # <-- added for decoding base64

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
    back_cover: str = Form(None),  # base64 string from frontend
    published_date: str = Form(None),
    pdf_file: UploadFile = File(...)
):
    try:
        # --- Save PDF file ---
        if not pdf_file.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")
        
        pdf_filename = f"{uuid4()}_{pdf_file.filename}"
        pdf_path = os.path.join(UPLOAD_FOLDER, pdf_filename)
        with open(pdf_path, "wb") as f:
            shutil.copyfileobj(pdf_file.file, f)

        # --- Save back_cover if provided as base64 ---
        back_cover_url = None
        if back_cover:
            try:
                header, encoded = back_cover.split(",", 1)
                data = base64.b64decode(encoded)
                ext = header.split("/")[1].split(";")[0]  # png or jpg
                back_cover_filename = f"{uuid4()}.{ext}"
                back_cover_path = os.path.join(UPLOAD_FOLDER, back_cover_filename)
                with open(back_cover_path, "wb") as f:
                    f.write(data)
                back_cover_url = f"/uploads/{back_cover_filename}"
            except Exception as e:
                raise HTTPException(status_code=400, detail="Invalid back_cover image")

        # --- Prepare book data ---
        book_data = {
            "title": title,
            "author": author,
            "genre": genre,
            "price": price,
            "description": description,
            "pdf_filename": pdf_filename,
            "pdf_url": f"/uploads/{pdf_filename}",
            "back_cover": back_cover_url,
            "published_date": published_date,
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
