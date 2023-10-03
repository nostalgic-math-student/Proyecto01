import csv
import requests
import os
import json
import time

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
    return temp


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
    if len(cacheClima) == 48:
        time.sleep(60)
    clima1 = 0
    clima2 = 0
    if (iataOg in cacheClima):
        clima1 = cacheClima[iataOg]
    else:
        clima1 = consulta_clima(latOg, lonOg)
        cacheClima[iataOg] = clima1

    if (iataDes in cacheClima):
        clima2 = cacheClima[iataDes]
    else:
        clima2 = consulta_clima(latOg, lonOg)
        cacheClima[iataDes] = clima2

    ticketsDic[ticket] = [iataOg, iataDes, latOg,
                          lonOg, latDes, lonDes, clima1, clima2]


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
