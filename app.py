import json
from flask import Flask, render_template, request, jsonify, redirect, url_for, make_response
# import razorpay
import requests
import copy
import yaml
from datetime import datetime
import pytz


app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')


@app.route('/Mytoken', methods = ['GET'])
def mytokenJSON():
    file = open('tokenCreation/build/contracts/MyToken.json')
    jsonFile = json.load(file)
    return jsonFile





@app.route('/ico', methods = ['GET'])
def icoJSON():
    file = open('tokenCreation/build/contracts/ICO.json')
    jsonFile = json.load(file)
    return jsonFile


@app.route('/error', methods=['GET','POST'])
def error():
    return render_template('error.html')


if __name__ == '__main__':
    app.debug = True
    app.run(debug=True)
    FLASK_APP = app.py
    
