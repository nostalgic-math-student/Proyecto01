import data from './ListData.json'
import { React, useState, useEffect, useMemo } from 'react'


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
    return (
        <ul>

            {isDropdownVisible && (
                <ul className="dropdown">
            {filteredData.map((item, index) => (
                <li key={item.id}>{item.text} ({item.iataCode})</li>
            ))}
                </ul>
            )}
            
        </ul>
    )
}

export default List