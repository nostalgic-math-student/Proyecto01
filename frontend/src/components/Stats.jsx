import React from 'react'

/* 
Componente ilustrativo de la temperatura, toma imagenes de termómetros para la temperatura dada
*/
const Stats = ({ weather, name, where }) => {

    const getWeatherImage = (weather) => {
            if(weather < 24){
                return "url";
            }
    }
    return (
        <div className='carousel-item'>

            <div className="card w-96 bg-base-100 shadow-xl center">
                <div className="card-body">

                    <h2 className="card-title">Temperature in {where}: {}</h2>
                    name
                    <p> {weather} C° <img
                        src={getWeatherImage(weather)}
                        alt="Description of the image"
                    />
                    </p>
                    <p>
                        {/* Agregar info de API de Humedad */}
                        Humidity
                    </p>
                    <p>
                        {/* Agregar info de API de viento */}
                        Wind
                    </p>
                    <p>
                        {/* Agregar info de API de Nubosidad */}
                        Nubosidad en inglés
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Stats