import data from './ListData.json'
import { React, useState, useEffect, useMemo } from 'react'
import Stats from './Stats';


/* 
componente List que nos ayuda a generar la distancia entre palabras para predecir el texto buscado.
NOTA: este componente no se terminó; hizo falta una API extra para buscar ciudad con IATA.
*/
function List(props) {


    // Implementacion extraida de https://masoudx.medium.com/sorting-words-by-similarity-in-typescript-a-guide-to-use-levenshtein-distance-algorithm-f6b4f3b57008
    const levenshteinDistance = (a, b) => {

        // Create a 2D array to store the distances
        let distances = new Array(a.length + 1);
        for (let i = 0; i <= a.length; i++) {
            distances[i] = new Array(b.length + 1);
        }


        // Initialize the first row and column
        for (let i = 0; i <= a.length; i++) {
            distances[i][0] = i;
        }
        for (let j = 0; j <= b.length; j++) {
            distances[0][j] = j;
        }

        // Fill in the rest of the array
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                if (a[i - 1] === b[j - 1]) {
                    distances[i][j] = distances[i - 1][j - 1];
                } else {
                    distances[i][j] = Math.min(distances[i - 1][j], distances[i][j - 1], distances[i - 1][j - 1]) + 1;
                }
            }
        }

        // Return the final distance
        return distances[a.length][b.length];
    }

    const sortBySimilarity = (words, query) => {
        // Create an array of objects to store the words and their distances
        let wordDistances = words.map(word => ({
            word: word,
            distance: levenshteinDistance(word.toLowerCase(), query.toLowerCase())
        }));

        // Sort the array by distance
        wordDistances.sort((a, b) => a.distance - b.distance);

        // Return the sorted list of words
        return wordDistances.map(wd => wd.word);
    }

    const sortedData = useMemo(() => {
        // Create a copy of the data array before sorting
        const newData = [...data];

        // Sort the data array based on Levenshtein distance for both name and iataCode
        newData.sort((a, b) => {
            const distanceNameA = levenshteinDistance(a.text.toLowerCase(), props.input);
            const distanceNameB = levenshteinDistance(b.text.toLowerCase(), props.input);
            
            const distanceIataCodeA = levenshteinDistance(a.iataCode.toLowerCase(), props.input);
            const distanceIataCodeB = levenshteinDistance(b.iataCode.toLowerCase(), props.input);

            // Use the minimum distance between name and iataCode
            const minDistanceA = Math.min(distanceNameA, distanceIataCodeA);
            const minDistanceB = Math.min(distanceNameB, distanceIataCodeB);

            return minDistanceA - minDistanceB;
        });
        return newData;
    }, [props.input]);
    

    const filteredData = sortedData.filter((event) => {
        if (props.input === '') {
            return true;
        }
        else {
            
            const matchingName = sortBySimilarity([event.text], props.input)
            const matchingIataCode = sortBySimilarity([event.iataCode], props.input)
            return matchingName.length > 0 || matchingIataCode > 0
        }
    }).slice(0,3)
    
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

export default List