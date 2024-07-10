from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import timedelta
from models import db, User, CarOwner, Car, Booking
from flask_migrate import Migrate 
bcrypt = Bcrypt()


app = Flask(__name__)  

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///car.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

CORS(app)

jwt = JWTManager(app)

from models import User, CarOwner, Car, Booking

migrate = Migrate(app, db)
db.init_app(app)
# Import your routes
# from backend.routes import *

# # All route definitions_



# User Registration
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    email = request.json.get("email", None)
    email_exists = User.query.filter_by(email=email).first()
    if email_exists:
        return jsonify({'message': 'Email already exists'}), 400
    
    new_user = User(
        name=request.json.get("name", None),
        email=request.json.get("email", None),
        password= bcrypt.generate_password_hash(request.json.get("password", None)).decode('utf-8'),
        is_carowner= request.json.get("is_carowner", None),
        profile_image=data.get('profile_image'),
        phone_number=data.get('phone_number')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'success': 'User registered successfully'}), 201

# User Login
@app.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity= user.id)
        return jsonify({'access_token': access_token})
    else:
        return jsonify({'success': 'Invalid credentials'}), 401
    
@app.route('/current_user', methods=["GET"])
@jwt_required()
def current_user():
    current_user_id= get_jwt_identity()
    user = User.query.get(current_user_id)

    user_data = {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'is_carowner': user.is_carowner,
        'profile_image': user.profile_image,
        'phone_number': user.phone_number
    }
    return jsonify(user_data)
BLACKLIST = set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header, decrypted_token):
    return decrypted_token['jti'] in BLACKLIST

@app.route('/logout', methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success": "Successfully logged out"}), 200


@app.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    current_user_id= get_jwt_identity()
    current_user = Car.query.get(current_user_id)
    
    if current_user.is_carowner:
        users = User.query.filter_by(owner_id = current_user_id).all()
        users_data = [
            {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'is_carowner': user.is_carowner,
                'profile_image': user.profile_image,
                'phone_number': user.phone_number} for user in users]
        return jsonify(users_data), 200
    else:
        return jsonify({"message": "You are not authorized to view this resource"}), 401
    
# Car operations
@app.route('/cars', methods=['POST'])
@jwt_required()
def create_car():
    
    current_user_id= get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if current_user.is_carowner:
        data = request.get_json()
        new_car = Car(
            name=data['name'],
            model=data['model'],
            year=data['year'],
            price_per_day=data['price_per_day'],
            availability_status= True if data['availability_status'] == "true" else False,
            owner_id=current_user_id,
            car_image_url = data['car_image_url']
        )
        db.session.add(new_car)
        db.session.commit()
        return jsonify({'message': 'Car added successfully'}), 201
    else:
        return jsonify({"message": "You are not authorized to view this resource"}), 40



if __name__ == "__main__":  
    app.run(debug=True)
