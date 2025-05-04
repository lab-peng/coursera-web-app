import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('Data fetching failure ...')
                }
                return res.json();
            })
            .then((data) => {
                setData(data.data);
                setIsLoading(false);
                setError(null);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.message);
            })

        // // Simulate a delay for loading state
        // // 500ms delay before fetching data
        // setTimeout(() => {
        //     fetch(url)
        //     .then(res => {
        //         if (!res.ok) {
        //             throw Error('Data fetching failure ...')
        //         }
        //         return res.json();
        //     })
        //     .then((data) => {
        //         setData(data.data);
        //         setIsLoading(false);
        //         setError(null);
        //     })
        //     .catch((err) => {
        //         setIsLoading(false);
        //         setError(err.message);
        //     })
        // }, 500);

    }, [url])

    return {data, isLoading, error}
}
 
export default useFetch;