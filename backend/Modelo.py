import csv
import requests

keyWeather = "891f3e081e3ffc2373bab6f7008f2903"


def consulta_clima(lat, long):
    """
    Dada una latitud y longitud devuelve la temperatura
    actual de dicha ubicación, en grados centígrados
    """
    url = 'http://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}&units=metric'.format(
        lat, long, keyWeather)
    res = requests.get(url)
    datos = res.json()

    temp = datos["main"]["temp"]
    presion = datos["main"]["pressure"]
    humedad = datos["main"]["humidity"]
    clima = datos["weather"][0]["main"]

    return temp, presion, humedad, clima


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
    clima1 = 0
    clima2 = 0
    pres1 = 0
    pres2 = 0
    hum1 = 0
    hum2 = 0
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


def modelo(dataset2):
    """
    Procesa un datos de un archivo CSV y regresa un diccionario con los mismos datos
    mas dos entradas extra, el clima de origen y el clima de destino.
    """

    with open(dataset2, 'r') as base_csv:
        lector_base = csv.reader(base_csv)
        # función para saltarnos la primera fila del csv
        next(lector_base)
        for linea in lector_base:
            procesaTicket(linea[0], linea[1], linea[2],
                          linea[3], linea[4], linea[5], linea[6])
        print("Procesado de ticket finalizado")
    return ticketsDic, cacheClima
