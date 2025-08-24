from fastapi import APIRouter, HTTPException
from App.crud import create_author, get_authors

router = APIRouter(prefix="/authors", tags=["Authors"])

@router.post("/")
def add_author(author: dict):
    try:
        created_author = create_author(author)
        return {"message": "Author created successfully", "author": created_author}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))



@router.get("/")
def fetch_authors():
    try:
        authors = get_authors()
        return {"authors": authors}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
