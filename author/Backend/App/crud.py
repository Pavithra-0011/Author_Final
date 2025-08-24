from App.database import books_collection, authors_collection

#----------BOOKS-------------
def create_book(book: dict):
    result = books_collection.insert_one(book)
    book["_id"] = str(result.inserted_id)
    return book

def get_books():
    """Return all books"""
    books = list(books_collection.find())
    for book in books:
        book['_id'] = str(book['_id'])
    return books

def get_book(book_id: str):
    """Return a single book by ID"""
    from bson.objectid import ObjectId
    book = books_collection.find_one({"_id": ObjectId(book_id)})
    if book:
        book['_id'] = str(book['_id'])
    return book

#----------AUTHORS-------------
def create_author(author: dict):
    result = authors_collection.insert_one(author)
    author["_id"] = str(result.inserted_id)
    return author

def get_authors():
    """Return all authors"""
    authors = list(authors_collection.find())
    for author in authors:
        author['_id'] = str(author['_id'])
    return authors

def get_author(author_id: str):
    """Return a single author by ID"""
    from bson.objectid import ObjectId
    author = authors_collection.find_one({"_id": ObjectId(author_id)})
    if author:
        author['_id'] = str(author['_id'])
    return author
