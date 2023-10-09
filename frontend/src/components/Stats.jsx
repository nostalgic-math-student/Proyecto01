import React from 'react'

/**
 * Componente `Stats` que muestra imagenes de la temperatura.
 * 
 * Este componente ilustra información relacionada con la temperatura, incluyendo una imagen
 * de termómetros para la temperatura dada.
 * 
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.weather - El estado climático actual.
 * @param {string} props.name - El nombre de la ubicación.
 * @param {string} props.location - La ubicación (Origen o Destino).
 * @param {number} props.humidity - La humedad actual.
 * @param {number} props.pressure - La presión atmosférica actual.
 * @param {number} props.temperature - La temperatura actual en grados Celsius.
 * @returns {JSX.Element} El componente de React que muestra información ilustrativa de la temperatura.
 */
const Stats = ({ weather, name, location, humidity, pressure,temperature  }) => {

    const getWeatherImage = (weather) => {
        // Por hacer: Jalar foto de info de clima 
    }
    return (
        <div className='carousel-item'>
            <div className="card w-96 bg-base-100 shadow-xl center">
                <div className="card-body mx-auto">

                    <h2 className="card-title">Statistics in {location}: {name}</h2>
                    <p> Temperature: {temperature} C° 
                    </p>
                    <p>
                        {/* Agregar info de API de Humedad */}
                        Humidity: {humidity} %
                    </p>
                    <p>
                        {/* Agregar info de API de viento */}
                        Pressure: {pressure} Pa
                    </p>
                    <p>
                        {/* Agregar info de API de Nubosidad */}
                        Current weather: {weather}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Stats