import React from 'react'

/* 
Componente ilustrativo de la temperatura, toma imagenes de termómetros para la temperatura dada
*/
const Stats = ({ weather, name }) => {

    return (
        <div className='carousel-item'>

            <div className="card w-96 bg-base-100 shadow-xl center">
                <div className="card-body">
                    <h2 className="card-title">Clima en origen: {name}</h2>
                    <p> {weather} C° {(weather > 24) && (<img
                        src="https://static.vecteezy.com/system/resources/previews/002/687/486/original/weather-summer-sun-hot-temperature-icon-isolated-image-free-vector.jpg"
                        alt="Description of the image"
                    />)}
                        {(weather < 12) && (<img
                            src="https://static.vecteezy.com/system/resources/previews/002/687/560/non_2x/weather-winter-cold-temperature-icon-isolated-image-free-vector.jpg"
                            alt="Description of the image"
                        />)}
                        {(weather <= 24 && weather >= 12) && (<img
                            src="https://png.pngtree.com/png-vector/20190917/ourmid/pngtree-temperature-icon-vectors-png-image_1737737.jpg"
                            alt="Description of the image"
                        />)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Stats