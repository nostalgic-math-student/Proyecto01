from flask import Flask, Response, request, jsonify
import pandas as pd
from flask_cors import CORS
import json
from Modelo import modelo


# API

"""
Llamamos al modelo generado para calcular de forma eficiente las temperaturas de la base de datos. 
Ejecutamos flask y los métodos siguientes son auxiliares en el Frontend.
"""
model, cacheClima = modelo('dataset2.csv')
app = Flask(__name__)

# Habilitamos CORS para permitir solicitudes desde cualquier origen
CORS(app)

# Llamamos al modelo generado para calcular eficientemente las temperaturas de la base de datos
model, cacheClima = modelo('dataset2.csv')

# Defininimos una ruta para obtener el segundo conjunto de datos en formato JSON
@app.route("/table2", methods=['GET'])
def Table2():
    """
    Obtiene el segundo conjunto de datos desde un archivo CSV y lo devuelve en formato JSON.

    Returns:
        Response: Una respuesta JSON que contiene los datos del segundo conjunto.
    """
    table_data = pd.read_csv('dataset2.csv')
    return Response(table_data.to_json(), mimetype='application/json')

# Definimos una ruta para obtener las temperaturas de origen y destino al recibir un número de ticket
@app.route("/climaTicket", methods=['GET'])
def ClimaTicket():
    """
    Obtiene las temperaturas y datos climáticos de origen y destino para un número de ticket dado.

    Returns:
        jsonify: Una respuesta JSON que contiene los datos climáticos de origen y destino.
    """
    ticket_id = request.args.get('ticket')
    if ticket_id in model:
        ticket_info = model[ticket_id]
        origin = ticket_info[0]
        destination = ticket_info[1]
        origin_weather = ticket_info[6]
        destination_weather = ticket_info[7]
        origin_pression = ticket_info[8]
        destin_pression = ticket_info[9]
        origin_humidity = ticket_info[10]
        destin_humidity = ticket_info[11]
        origin_nubosity = ticket_info[12]
        destin_nubosity = ticket_info[13]

        # Agregar más datos extraidos de API
        response = {
            "origin": f"{origin}",
            "destination": f"{destination}",
            "o_weather": f"{origin_weather}",
            "d_weather": f"{destination_weather}",
            "o_pression": f"{origin_pression}",
            "d_pression": f"{destin_pression}",
            "o_humidity": f"{origin_humidity}",
            "d_humidity": f"{destin_humidity}",
            "o_nubosity": f"{origin_nubosity}",
            "d_nubosity": f"{destin_nubosity}"
        }

    return jsonify(response), 200

# Regresa temperatura específica mediante IATA

@app.route("/climaPorCiudad", methods=['GET'])
def ClimaPorCiudad():
    IATA = request.args.get('IATA')
    listaClim = cacheClima[IATA]
    temp_city = listaClim[0]
    pres_city = listaClim[1]
    hum_city = listaClim[2]
    nub_city = listaClim[3]

    response = {
        # Agregar más datos de la ciudad
        "Temp": f"{temp_city}",
        "Pres": f"{pres_city}",
        "Hum": f"{hum_city}",
        "Nub": f"{nub_city}"
    }
    return jsonify(response), 200

# Regresa todos los climas recopilados por modelo


@app.route("/climas", methods=['GET'])
def Climas():
    return jsonify(cacheClima), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
