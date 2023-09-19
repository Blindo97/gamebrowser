import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface FetchResponse<T> {
    count: number;
    results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: unknown[]) => {
    const [data, setData] = useState<T[]>([]); // defining the type of the games and setting it as empty array
    const [error, setError] = useState(""); // setting error to empty string
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
        const controller = new AbortController();

      setLoading(true);
      apiClient // our fetched data
        .get<FetchResponse<T>>(endpoint, {signal: controller.signal, ...requestConfig}) // using .get "/games" to send a fetch request to our [api-key/games link] to get data's that has count and results in it
        .then((res) => {
          setData(res.data.results); // set games to data we got using .get
          setLoading(false);
        })
        .catch((err) => {
            if (err instanceof CanceledError) return;
          setError(err.message); // set error to error.message
          setLoading(false);
        });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps ? [...deps]: []);

    return {data, error, isLoading} // return the games and error even if they are empty so they can be used on other components
};

export default useData;