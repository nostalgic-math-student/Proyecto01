from flask import Flask, Response, request, jsonify
import pandas as pd
from flask_cors import CORS
from Modelo import modelo

# Creamos una instancia de Flask
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

        # Agregamos más datos extraídos de la API de clima
        response = {
            "origin": f"{origin}",
            "destination": f"{destination}",
            "origin_weather": f"{origin_weather}",
            "destination_weather": f"{destination_weather}",
            "origin_pressure": f"{origin_pression}",
            "destination_pressure": f"{destin_pression}",
            "origin_humidity": f"{origin_humidity}",
            "destination_humidity": f"{destin_humidity}",
            "origin_nubosity": f"{origin_nubosity}",
            "destination_nubosity": f"{destin_nubosity}"
        }

    return jsonify(response), 200

# Definimos una ruta para obtener la temperatura mediante el código IATA de una ciudad
@app.route("/climaPorCiudad", methods=['GET'])
def ClimaPorCiudad():
    """
    Obtiene la temperatura y datos climáticos específicos de una ciudad utilizando su código IATA.

    Returns:
        jsonify: Una respuesta JSON que contiene los datos climáticos de la ciudad.
    """
    IATA = request.args.get('IATA')
    listaClim = cacheClima[IATA]
    temp_city = listaClim[0]
    pres_city = listaClim[1]
    hum_city = listaClim[2]
    nub_city = listaClim[3]

    response = {
        # Agregar más datos de la ciudad
        "Temperature": f"{temp_city}",
        "Pressure": f"{pres_city}",
        "Humidity": f"{hum_city}",
        "Nubosity": f"{nub_city}"
    }
    return jsonify(response), 200

# Definimos una ruta para obtener todos los datos climáticos recopilados por el modelo
@app.route("/climas", methods=['GET'])
def Climas():
    """
    Obtiene todos los datos climáticos recopilados por el modelo.

    Returns:
        jsonify: Una respuesta JSON que contiene todos los datos climáticos.
    """
    return jsonify(cacheClima), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
