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
        return jsonify({'error': 'Invalid credentials'}), 401
    
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
        return jsonify({"error": "You are not authorized to view this resource"}), 401
    
# Car operations
@app.route('/cars', methods=['POST'])
@jwt_required()
def create_car():
    
    current_user_id= get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if current_user.is_carowner == "true":
        data = request.get_json()
        new_car = Car(

            name = data["name"],
            model= data['model'],
            year= data['year'],
            price_per_day = data['price_per_day'],
            # availability_status =  data['availability_status'],
            owner_id= current_user_id,
            car_image_url = data['car_image_url']
        )
        db.session.add(new_car)
        db.session.commit()
        return jsonify({'success': 'Car added successfully'}), 201
    else:
        return jsonify({"error": "You are not authorized to view this resource"}), 401
@app.route('/cars', methods=['GET'])
@jwt_required()
def get_cars():
    cars = Car.query.all()
    car_list = [{
        'id': car.id,
        'name': car.name,
        'model': car.model,
        'year': car.year,
        'price_per_day': car.price_per_day,
        # 'availability_status': car.availability_status,        
        'car_image_url': car.car_image_url        
    } for car in cars]
    return jsonify(car_list), 200

@app.route('/car/<int:id>', methods=['PUT'])
@jwt_required()
def update_car(id):
    current_user_id= get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if current_user.is_carowner == "true":
        data = request.get_json()
        car = Car.query.get(id)    
        if car is None:
            return jsonify({"message": "Car not found"}), 404
        
        car.name = data.get('name', car.name)
        car.model = data.get('model', car.model)
        car.year = data.get('year', car.year)
        car.price_per_day = data.get('price_per_day', car.price_per_day)
        car.availability_status = data.get('availability_status', car.availability_status)
        car.car_image_url = data.get('car_image_url', car.car_image_url)
        db.session.commit()
        return jsonify({"success": "Car updated successfully"}), 200
    else:
        return jsonify({"error": "You are not authorized to view this resource"}), 401


@app.route('/users', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()
    loggedin_user_id = get_jwt_identity()
    user = User.query.get(loggedin_user_id)

    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user.is_carowner = data.get('is_carowner', user.is_carowner)
    user.profile_image = data.get('profile_image', user.profile_image)
    user.phone_number = data.get('phone_number', user.phone_number)

    db.session.commit()
    return jsonify({"success": "User updated successfully"}), 200

@app.route('/users/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    # user = User.query.get(id)
    if user is None:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"success": "User deleted successfully"}), 200
# CarOwner operations

# Create Car Owner
@app.route('/carowners', methods=['POST'])
@jwt_required()
def create_car_owner():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user.is_carowner:
        return jsonify({"error": "Only car owners can create car owner profiles"}), 401

    data = request.get_json()
    new_car_owner = CarOwner(
        user_id=current_user_id,
        company_name=data.get('company_name'),
        company_address=data.get('company_address')
    )
    db.session.add(new_car_owner)
    db.session.commit()
    return jsonify({'success': 'Car owner profile created successfully'}), 201

# Get Car Owner
@app.route('/carowners/<int:id>', methods=['GET'])
@jwt_required()
def get_car_owner(id):
    car_owner = CarOwner.query.get(id)
    if car_owner is None:
        return jsonify({"error": "Car owner not found"}), 404

    car_owner_data = {
        'id': car_owner.id,
        'user_id': car_owner.user_id,
        'company_name': car_owner.company_name,
        'company_address': car_owner.company_address
    }
    return jsonify(car_owner_data), 200

# Update Car Owner
@app.route('/carowners/<int:id>', methods=['PUT'])
@jwt_required()
def update_car_owner(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user.is_carowner:
        return jsonify({"error": "Only car owners can update car owner profiles"}), 401

    car_owner = CarOwner.query.get(id)
    if car_owner is None:
        return jsonify({"error": "Car owner not found"}), 404

    data = request.get_json()
    car_owner.company_name = data.get('company_name', car_owner.company_name)
    car_owner.company_address = data.get('company_address', car_owner.company_address)
    db.session.commit()
    return jsonify({"success": "Car owner profile updated successfully"}), 200

# Delete Car Owner
@app.route('/carowners/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_car_owner(id):
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user.is_carowner:
        return jsonify({"error": "Only car owners can delete car owner profiles"}), 401

    car_owner = CarOwner.query.get(id)
    if car_owner is None:
        return jsonify({"error": "Car owner not found"}), 404

    db.session.delete(car_owner)
    db.session.commit()
    return jsonify({"success": "Car owner profile deleted successfully"}), 200


# BOOKINGS
@app.route('/bookings', methods=['POST'])
@jwt_required()
def create_booking():
    data = request.get_json()
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if current_user.is_carowner == "true":
        return jsonify({"error": "Car owner cannot book a car"}), 404
    elif current_user.is_carowner == "false":
        new_booking = Booking(
            user_id= current_user_id,
            car_id = data['car_id'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            
        )
        db.session.add(new_booking)
        db.session.commit()
        return jsonify({'success': 'Booking added successfully'}), 201


@app.route('/bookings/<int:id>', methods = ['DELETE'])
def delete_booking(id):
    booking = Booking.query.get(id)
    if booking is None:
        return jsonify({"error": "Booking not found"}), 404
    db.session.delete(booking)
    db.session.commit()
    return jsonify({"success": "Booking deleted successfully"}), 200

if __name__ == "__main__":  
    app.run(debug=True)
