from flask import Flask, Response
import pandas as pd

app = Flask(__name__)

@app.route("/table1", methods=['GET'])
def Table1():
    table_data = pd.read_csv('dataset1.csv')
    return Response(table_data.to_json(), mimetype='application/json')

@app.route("/table2", methods=['GET'])
def Table2():
    table_data = pd.read_csv('dataset2.csv')
    return Response(table_data.to_json(), mimetype='application/json')