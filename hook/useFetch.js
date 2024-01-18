import { useState, useEffect } from 'react';
import axios from 'axios';

// Hook useFetch
const useFetch = () => {
    // Stany dla danych, stanu ładowania i błędu
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Funkcja do pobierania danych z API
    const fetchData = async () => {
        try {
            // Wywołanie API za pomocą biblioteki axios
            const response = await axios.get("http://10.0.2.2:3000/api/products/");
            console.log("Dane otrzymane:", response.data);
            // Ustawienie danych w stanie
            setData(response.data);
        } catch (error) {
            // Obsługa błędu w przypadku niepowodzenia żądania
            console.error("Zrobiło siup bęc:", error);
            // Ustawienie błędu w stanie
            setError(error);
        } finally {
            // Zakończenie ładowania, niezależnie od wyniku żądania
            setIsLoading(false);
        }
    };

    // Efekt pobierający dane przy zamontowaniu komponentu
    useEffect(() => {
        fetchData();
    }, []); // Pusta tablica zależności oznacza, że efekt wykonuje się tylko raz, po zamontowaniu

    // Funkcja do ponownego pobrania danych
    const refetch = () => {
        // Ustawienie stanu ładowania przed ponownym pobraniem
        setIsLoading(true);
        fetchData();
    };

    // Zwracanie danych, stanu ładowania, błędu i funkcji do ponownego pobrania
    return { data, isLoading, error, refetch };
};

export default useFetch; // Eksportowanie hooka useFetch
