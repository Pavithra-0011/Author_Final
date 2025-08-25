from pymongo.errors import PyMongoError
from App.database import db, authors_collection, books_collection

print("Collections in DB:", db.list_collection_names())