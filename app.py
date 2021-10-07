
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, redirect

# Flask Setup
app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
