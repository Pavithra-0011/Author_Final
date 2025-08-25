from App.database import db
from App.models.author import Author
from App.models.book import Book
from datetime import datetime, timezone

#----------BOOKS-------------
def create_book(book: dict):
    from datetime import datetime, timezone
    
    if "image" in book:
        book["back_cover"] = book.pop("image")
    
    if "published_date" in book and isinstance(book["published_date"], str):
        book["published_date"] = datetime.fromisoformat(book["published_date"])
    elif "published_date" not in book:
        book["published_date"] = datetime.now(timezone.utc)
    
    result = db.Book.insert_one(book)
    return str(result.inserted_id)



def get_books():
    """Return all books"""
    books = list(db.Book.find())
    for book in books:
        book['_id'] = str(book['_id'])
    return books

def get_book(book_id: str):
    """Return a single book by ID"""
    book = db.Book.find_one({"_id": book_id})
    if book:
        book['_id'] = str(book['_id'])
    return book

#----------AUTHORS-------------
def create_author(author: dict):
    result = db.Author.insert_one(author)
    return str(result.inserted_id)

def get_authors():
    """Return all authors"""
    authors = list(db.Author.find())
    for author in authors:
        author['_id'] = str(author['_id'])
    return authors

def get_author(author_id: str):
    """Return a single author by ID"""
    author = db.Author.find_one({"_id": author_id})
    if author:
        author['_id'] = str(author['_id'])
    return author