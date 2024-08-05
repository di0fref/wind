import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";

const useFetchApi = () => {
    const [fetchData, setFetchData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const baseURL ="https://jsonplaceholder.typicode.com/"

    // Reference for AbortController
    const abortControllerRef = useRef(null);

    const handleApi = useCallback(async (url, method = 'GET', data = null) => {
        setLoading(true);
        setError(null);
        // checking the presence of previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        // Getting Signal to Abort from the controller
        const { signal } = abortControllerRef.current;
        try {
            const axiosInstance = axios.create({
                baseURL,
            });

            const response = await axiosInstance({
                method,
                url,
                data,
                // Associate the instance with the Signal
                signal
            });
            setFetchData(response.data);
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Request canceled', err.message);
            }
            else {
                setError(err);
            }
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        // Cleanup function to abort the request if the component unmounts
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    return { fetchData, error, loading, handleApi };
};

export default useFetchApi;
