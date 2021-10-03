
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
#import config

from flask import Flask, jsonify, render_template, redirect
from sqlalchemy.orm.query import _ColumnEntity

# Database Setup
database = 'restaurant_db'
engine = create_engine(f'postgresql://postgres:{config.password}@localhost:{config.port}/{database}')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Restaurant_info = Base.classes.restaurants


# Flask Setup
app = Flask(__name__)

# Flask Routes

@app.route("/")
def home():
    print("rendering homepage")
    # Return template and data
    return render_template("index.html")

@app.route("/categories")
def categories():
    return render_template("categories.html")

@app.route("/map")
def map():
    return render_template("maps.html")

@app.route("/find")
def find():
    return render_template("find.html")

@app.route("/ratings")
def ratings():
    return render_template("ratings.html")

@app.route("/categories")
def categories():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all passengers
    results = session.query(Restaurant_info.restaurant, Restaurant_info.boro,Restaurant_info.phone,Restaurant_info.cuisine,Restaurant_info.latitude,Restaurant_info.longitude,Restaurant_info.violationdesc).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    categories_info = []
    for name,city,phone,cuisine,latitude,longitude,desc in results:
        categories_dict = {}
        categories_dict["num"] = num
        categories_dict["business_id"] = business_id
        categories_dict["name"] = name
        categories_dict["address"] = address
        categories_dict["city"] = city
        categories_dict["state"] = state
        categories_dict["postal_code"] = postal_code
        categories_dict["longitude"] = longitude
        categories_dict["latitude"] = latitude
        categories_dict["categories"] = categories
        categories_dict["stars"] = stars
	    categories_dict["review_count"] review_count
        categories_dict["is_open"] is_open
	    categories_dict["attributes"] attributes
	    categories_dict["categories"] categories
        categories_dict["hours"] hours
        categories_info.append(categories_dict)

    return jsonify(cuisine_info)
    



if __name__ == '__main__':
    app.run(debug=True)