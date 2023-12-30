import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://10.0.2.2:3000/api/products/");
            console.log("Dane otrzymane:", response.data);
            setData(response.data);
        } catch (error) {
            console.error("Zrobiło siup bęc:", error);
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
