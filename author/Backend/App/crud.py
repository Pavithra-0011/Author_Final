from App.database import db
from App.models.author import Author
from App.models.book import Book



#----------BOOKS-------------
def create_book(book: dict):
    
    result = db.Book.insert_one(book)
    return str(result.inserted_id)


def get_book(book_id: str):
    Books = list(db.Book.find())
    for book in Books:
        book['_id'] = str(book['_id'])
    return Books


#----------AUTHORS-------------
def create_author(author: dict):
    result = db.Author.insert_one(author)
    return str(result.inserted_id)


def get_author(author_id: str):
    Authors = list(db.Author.find())
    for author in Authors:
        author['_id'] = str(author['_id'])
    return Authors