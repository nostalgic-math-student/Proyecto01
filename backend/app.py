from flask import Flask, Response, request,jsonify
import pandas as pd
from flask_cors import CORS 
import json
from Modelo import modelo


### API 

"""
Llamamos al modelo generado para calcular de forma eficiente las temperaturas de la base de datos. 
Ejecutamos flask y los métodos siguientes son auxiliares en el Frontend.
"""
model, cacheClima, cacheInformacion = modelo('dataset2.csv')
app = Flask(__name__)
CORS(app)

# Regresa segundo dataset en forma de JSON
@app.route("/table2", methods=['GET'])
def Table2():
    table_data = pd.read_csv('dataset2.csv')
    return Response(table_data.to_json(), mimetype='application/json')

# Regresa temperaturas de origen y destino al recibir ticket.
@app.route("/climaTicket", methods=['GET'])
def ClimaTicket():
    ticket_id = request.args.get('ticket')
    if ticket_id in model:
        ticket_info = model[ticket_id]
        origin = ticket_info[0]
        destination = ticket_info[1]
        origin_weather = ticket_info[6]
        destination_weather = ticket_info[7]
        
        ### Agregar más datos extraidos de API
        response = {
            "origin":f"{origin}",
            "destination":f"{destination}",
            "o_weather":f"{origin_weather}",
            "d_weather":f"{destination_weather}",
        }

    return jsonify(response), 200

# Regresa temperatura específica mediante IATA
@app.route("/climaPorCiudad", methods=['GET'])
def ClimaPorCiudad():
    IATA = request.args.get('IATA')
    temp_city = cacheClima[IATA]['clima']

    response = {
        ### Agregar más datos de la ciudad
        "Temp":f"{temp_city}"
    }
    return jsonify(response),200

# Regresa todos los climas recopilados por modelo
@app.route("/climas", methods=['GET'])
def Climas():
    return jsonify(cacheClima),200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)