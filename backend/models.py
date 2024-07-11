from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_carowner = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)    
    bookings = db.relationship('Booking', backref='user', lazy=True)

    serialize_rules = ('-password', '-bookings.user',)

  


class CarOwner(db.Model, SerializerMixin):
    __tablename__ = "car_owners"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    profile_image = db.Column(db.String(255), nullable=True)
    cars = db.relationship('Car', backref='car_owner', lazy=True)

   


class Car(db.Model, SerializerMixin):
    __tablename__ = "cars"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    model = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    price_per_day = db.Column(db.Numeric, nullable=False)
    # availability_status = db.Column(db.String(255), nullable=False, default=True)
    car_image_url = db.Column(db.String(255), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('car_owners.id'), nullable=False)    
    bookings = db.relationship('Booking', backref='car', lazy=True)


class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'), nullable=False)
    start_date = db.Column(db.String, nullable=False)
    end_date = db.Column(db.String, nullable=False)
    