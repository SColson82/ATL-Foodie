
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
# from models import create_classes
# import config

from flask import Flask, jsonify, render_template, redirect
# from sqlalchemy.orm.query import _ColumnEntity


# # Database Setup
# database = 'restaurant_db'
# engine = create_engine(f'postgresql://postgres:{config.password}@localhost:{config.port}/{database}')

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# Restaurant_info = Base.classes.restaurants


# Flask Setup
app = Flask(__name__)

# URI = 'postgres://vbynbwqmhuehyr:52b5911eb7ae6372b4a883f471cdd20abcb046cafa3cda003c4dd225817fe760@ec2-34-233-105-94.compute-1.amazonaws.com:5432/d7g3pajuot26v2'
# URL = 'https://atl-foodie-page.herokuapp.com/'

# app.config[URI] = os.environ.get(
#     URL, '')  # or "sqlite:///db.sqlite"

# # Remove tracking modifications
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = sqlalchemy(app)
# atlFood = create_classes(db)

# Flask Routes


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/fortune")
def fortune():
    return render_template("fortune.html")


@app.route("/map")
def map():
    return render_template("map.html")


@app.route("/find")
def find():
    return render_template("find.html")


@app.route("/ratings")
def ratings():
    return render_template("ratings.html")

@app.route("/cuisines")
def cuisines():
    return render_template("cuisines.html")


# @app.route("/categories")
# def categories():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query all passengers
#     results = session.query(Restaurant_info.restaurant, Restaurant_info.boro, Restaurant_info.phone, Restaurant_info.cuisine,
#                             Restaurant_info.latitude, Restaurant_info.longitude, Restaurant_info.violationdesc).all()

#     session.close()

    # # Create a dictionary from the row data and append to a list of all_passengers
    # categories_info = []
    # for name, city, phone, cuisine, latitude, longitude, desc in results:
    #     categories_dict = {}
    #     categories_dict["num"] = num
    #     categories_dict["business_id"] = business_id
    #     categories_dict["name"] = name
    #     categories_dict["address"] = address
    #     categories_dict["city"] = city
    #     categories_dict["state"] = state
    #     categories_dict["postal_code"] = postal_code
    #     categories_dict["longitude"] = longitude
    #     categories_dict["latitude"] = latitude
    #     categories_dict["categories"] = categories
    #     categories_dict["stars"] = stars
    #     categories_dict["review_count"] = review_count
    #     categories_dict["is_open"] = is_open
    #     categories_dict["attributes"] = attributes
    #     categories_dict["hours"] = hours
    #     categories_info.append(categories_dict)

    # return jsonify(cuisine_info)


if __name__ == '__main__':
    app.run(debug=True)
