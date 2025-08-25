from pymongo import MongoClient
from App.config import MONGO_URI, DB_NAME


try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME] 
    print(f"Connected to MongoDB database: {DB_NAME}")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    raise e     

  
authors_collection = db['authors']  
books_collection = db['books']