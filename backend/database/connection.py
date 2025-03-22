from pymongo import MongoClient
from config import MONGO_URI

client = MongoClient(MONGO_URI)
db = client["avengers_quiz"]
users_collection = db["users"]
