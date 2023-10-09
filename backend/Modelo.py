import csv
import requests
<<<<<<< HEAD
import json
=======
>>>>>>> 546c38a6e253e8b6a6ebdef6de38c0dfed1b259d

# Clave de API de OpenWeatherMap
keyWeather = "891f3e081e3ffc2373bab6f7008f2903"


def consulta_clima(lat, long):
    """
    Dada una latitud y longitud, devuelve la temperatura
    actual de dicha ubicación en grados centígrados, así como
    la presión, humedad y condiciones climáticas.

    Args:
        lat (float): Latitud de la ubicación.
        long (float): Longitud de la ubicación.

    Returns:
        tuple: Una tupla con la temperatura (en grados Celsius),
               presión (en hPa), humedad (en %) y condiciones climáticas.
    """
    url = 'http://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}&units=metric'.format(
        lat, long, keyWeather)
    res = requests.get(url)
    datos = res.json()

    temp = datos["main"]["temp"]
    presion = datos["main"]["pressure"]
    humedad = datos["main"]["humidity"]
<<<<<<< HEAD
    clima = datos["weather"][0]["main"]

    return temp, presion, humedad, clima
=======
    nubosidad = datos["weather"][0]["main"]

    return temp, presion, humedad, nubosidad
>>>>>>> 546c38a6e253e8b6a6ebdef6de38c0dfed1b259d


ticketsDic = {}
cacheClima = {}


def procesaTicket(ticket, iataOg, iataDes, latOg, lonOg, latDes, lonDes):
    """
    Este método procesa un ticket para devolver el mismo información adicional que
    son climas de origen y destino del vuelvo.

    Args:
        ticket (str): El número de ticket de vuelo.
        iataOg (str): El código IATA del aeropuerto de origen.
        iataDes (str): El código IATA del aeropuerto de destino.
        latOg (float): Latitud del aeropuerto de origen.
        lonOg (float): Longitud del aeropuerto de origen.
        latDes (float): Latitud del aeropuerto de destino.
        lonDes (float): Longitud del aeropuerto de destino.

    Descripción:
        Este método regresa la misma información del ticket y dos datos más,
        los cuales son el clima de origen del vuelvo y el clima de destino del vuelo.
    """
<<<<<<< HEAD

=======
>>>>>>> 546c38a6e253e8b6a6ebdef6de38c0dfed1b259d
    clima1 = 0
    clima2 = 0
    pres1 = 0
    pres2 = 0
    hum1 = 0
    hum2 = 0
<<<<<<< HEAD
    temp1 = 0
    temp2 = 0
    if (iataOg in cacheClima):
        lista1 = cacheClima[iataOg]
        temp1, pres1, hum1, clima1 = lista1[0], lista1[1], lista1[2], lista1[3]
    else:

        temp1, pres1, hum1, clima1 = consulta_clima(latOg, lonOg)
        cacheClima[iataOg] = [temp1, pres1, hum1, clima1]

    if (iataDes in cacheClima):
        list2 = cacheClima[iataDes]
        temp2, pres2, hum2, clima2 = list2[0], list2[1], list2[2], list2[3]
    else:
        temp2, pres2, hum2, clima2 = consulta_clima(latDes, lonDes)
        cacheClima[iataDes] = [temp2, pres2, hum2, clima2]

    ticketsDic[ticket] = [iataOg, iataDes, latOg,
                          lonOg, latDes, lonDes, temp1, temp2, pres1, pres2, hum1, hum2, clima1, clima2]
=======
    nub1 = 0
    nub2 = 0
    if (iataOg in cacheClima):
        lista1 = cacheClima[iataOg]
        clima1, pres1, hum1, nub1 = lista1[0], lista1[1], lista1[2], lista1[3]
    else:

        clima1, pres1, hum1, nub1 = consulta_clima(latOg, lonOg)
        cacheClima[iataOg] = [clima1, pres1, hum1, nub1]

    if (iataDes in cacheClima):
        list2 = cacheClima[iataDes]
        clima2, pres2, hum2, nub2 = list2[0], list2[1], list2[2], list2[3]
    else:
        clima2, pres2, hum2, nub2 = consulta_clima(latDes, lonDes)
        cacheClima[iataDes] = [clima2, pres2, hum2, nub2]

    ticketsDic[ticket] = [iataOg, iataDes, latOg,
                          lonOg, latDes, lonDes, clima1, clima2, pres1, pres2, hum1, hum2, nub1, nub2]
>>>>>>> 546c38a6e253e8b6a6ebdef6de38c0dfed1b259d


def modelo(dataset2):
    """
    Procesa un conjunto de datos de un archivo CSV y regresa un diccionario
    con los mismos datos y dos entradas adicionales que son el clima de origen
    y el clima de destino para cada ticket de vuelo.

    Args:
        dataset2 (str): La ruta al archivo CSV que contiene los datos.

    Returns:
        tuple: Una tupla que contiene dos diccionarios, el primero con los datos
               de los tickets de vuelo y el segundo con los datos de clima cacheados.
    """
    
    with open(dataset2, 'r') as base_csv:
        lector_base = csv.reader(base_csv)
        # función para saltarnos la primera fila del csv
        next(lector_base)
        for linea in lector_base:
            procesaTicket(linea[0], linea[1], linea[2],
                          linea[3], linea[4], linea[5], linea[6])
    return ticketsDic, cacheClima
