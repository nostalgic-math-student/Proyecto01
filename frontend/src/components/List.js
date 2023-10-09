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
        for (let i = 0; i <= a.length; i++) {
            distances[i] = new Array(b.length + 1);
        }

        // Inicializar la primera fila y columna.
        for (let i = 0; i <= a.length; i++) {
            distances[i][0] = i;
        }
        for (let j = 0; j <= b.length; j++) {
            distances[0][j] = j;
        }

        // Calcular la distancia de Levenshtein.
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                if (a[i - 1] === b[j - 1]) {
                    distances[i][j] = distances[i - 1][j - 1];
                } else {
                    distances[i][j] = Math.min(
                        distances[i - 1][j],
                        distances[i][j - 1],
                        distances[i - 1][j - 1]
                    ) + 1;
                }
            }
        }

        // Devolver la distancia final.
        return distances[a.length][b.length];
    }

    // Función para ordenar un array de palabras por similitud a una consulta.
    const sortBySimilarity = (words, query) => {
        // Crear un array de objetos para almacenar las palabras y sus distancias.
        let wordDistances = words.map(word => ({
            word: word,
            distance: levenshteinDistance(word.toLowerCase(), query.toLowerCase())
        }));

        // Ordenar el array por distancia.
        wordDistances.sort((a, b) => a.distance - b.distance);

        // Devolver la lista ordenada de palabras.
        return wordDistances.map(wd => wd.word);
    }

    // Calcular y memoizar los datos ordenados en función de la consulta.
    const sortedData = useMemo(() => {
        // Crear una copia del array de datos antes de ordenarlo.
        const newData = [...data];

        // Ordenar el array de datos en función de la distancia de Levenshtein para name e iataCode.
        newData.sort((a, b) => {
            const distanceNameA = levenshteinDistance(a.text.toLowerCase(), props.input);
            const distanceNameB = levenshteinDistance(b.text.toLowerCase(), props.input);

            const distanceIataCodeA = levenshteinDistance(a.iataCode.toLowerCase(), props.input);
            const distanceIataCodeB = levenshteinDistance(b.iataCode.toLowerCase(), props.input);

            // Usar la distancia mínima entre name e iataCode.
            const minDistanceA = Math.min(distanceNameA, distanceIataCodeA);
            const minDistanceB = Math.min(distanceNameB, distanceIataCodeB);

            return minDistanceA - minDistanceB;
        });
        return newData;
    }, [props.input]);

    // Filtrar los datos ordenados en función de la consulta y mostrar los resultados.
    const filteredData = sortedData.filter((event) => {
        if (props.input === '') {
            return true;
        } else {
            const matchingName = sortBySimilarity([event.text], props.input);
            const matchingIataCode = sortBySimilarity([event.iataCode], props.input);
            return matchingName.length > 0 || matchingIataCode > 0;
        }
    }).slice(0, 3);

    // Determinar si el menú desplegable debe mostrarse.
    const isDropdownVisible = props.input !== '' && filteredData.length > 0;

    // onClick para buscar por lugar
    const [placeWeather, setPlaceWeather] = useState({});
    const [activePlaceWeather, setActivePlaceWeather] = useState(false);
    const [Error, setError] = useState(false);
    const [place, setPlace] = useState("");

    const getIataWeather = (iata_place) => {
        const apiUrl = `http://127.0.0.1:5000/climaPorCiudad?IATA=${iata_place}`;
        fetch(apiUrl).then(
          response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          }).then(
            data => {
              setPlaceWeather(data);
              setError(false)
              setActivePlaceWeather(true)
            }
          ).catch((error) => {
            console.error("Error fetching data:", error);
            setError(true);
            setActivePlaceWeather(false)
          })
        

          console.log(placeWeather)
    }
    


    return (
        <>
        <ul>
<<<<<<< HEAD
            
            {isDropdownVisible && (
                <ul className="dropdown">
                    {filteredData.map((item, index) => (
                        <li key={item.id}>{item.text} ({item.iataCode})</li>
                    ))}
=======
            {isDropdownVisible && (
                <ul className="dropdown">
                    {/* Agregar funcion de ver datos de la ciudad */}
            {filteredData.map((item, index) => (
                <li className='btn btn-active btn-accent' key={item.id} onClick={() => 
                    {getIataWeather(item.iataCode);
                        setPlace(item.text)
                }
                
                
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
