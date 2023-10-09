import data from './ListData.json'
import { React, useState, useEffect, useMemo } from 'react'
import Stats from './Stats';


// Componente "List" que ayuda a calcular la distancia entre palabras para buscar texto.
// NOTA: Este componente no se ha completado; se requiere una API adicional para buscar ciudades por IATA.
function List(props) {

    // Implementación del algoritmo de distancia de Levenshtein.
    const levenshteinDistance = (a, b) => {
        // Crear una matriz 2D para almacenar las distancias.
        let distances = new Array(a.length + 1);

                
                }>{item.text} ({item.iataCode})</li>
                ))}
                </ul>
            )}

        </ul>
        { activePlaceWeather && 
        (<Stats temperature={placeWeather.Temp} name={place} humidity={placeWeather.Hum} pressure={placeWeather.Pres} weather={placeWeather.Nub} />)
        }
            </>
    )
}

export default List;
