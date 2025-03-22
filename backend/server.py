from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from routes import routes
from pymongo import MongoClient
from config import SECRET_KEY, MONGO_URI

app = Flask(__name__)

# Configure JWT Authentication
app.config["JWT_SECRET_KEY"] = SECRET_KEY
jwt = JWTManager(app)

# Enable CORS for frontend requests
CORS(app)

# Initialize MongoDB Connection
client = MongoClient(MONGO_URI)
db = client["avengers_quiz"]

# Register API routes
app.register_blueprint(routes)

if __name__ == "__main__":
    app.run(debug=True)
