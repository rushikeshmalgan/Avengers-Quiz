from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
import datetime

bcrypt = Bcrypt()

def hash_password(password):
    return bcrypt.generate_password_hash(password).decode("utf-8")

def verify_password(password, hashed_password):
    return bcrypt.check_password_hash(hashed_password, password)

def generate_token(username):
    expires = datetime.timedelta(days=1)
    return create_access_token(identity=username, expires_delta=expires)
