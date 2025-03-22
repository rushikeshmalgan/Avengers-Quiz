from database.connection import users_collection

def create_user(username, password):
    user = {"username": username, "password": password}
    users_collection.insert_one(user)

def get_user(username):
    return users_collection.find_one({"username": username})
