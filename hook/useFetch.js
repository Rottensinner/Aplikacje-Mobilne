import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/products/");
            console.log("Response data:", response.data); // Dodaj ten console.log
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error); // Dodaj ten console.error
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetch;
