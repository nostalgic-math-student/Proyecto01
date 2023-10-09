import React from 'react'

/* 
Componente ilustrativo de la temperatura, toma imagenes de termómetros para la temperatura dada
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