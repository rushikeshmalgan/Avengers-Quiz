from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
import bcrypt

# Initialize Flask Blueprint
routes = Blueprint("routes", __name__)

# Connect to MongoDB
mongo = PyMongo()
client = MongoClient("mongodb://localhost:27017/")
db = client["avengers_quiz"]
users_collection = db["users"]

# Signup Route
@routes.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    users_collection.insert_one({"username": username, "password": hashed_password})

    return jsonify({"message": "Signup successful"}), 201

# Login Route
@routes.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({"username": username})
    
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
        access_token = create_access_token(identity=username)
        return jsonify({"message": "Login successful", "token": access_token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# Protected Route (Example)
@routes.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Welcome {current_user}, this is a protected route!"}), 200
