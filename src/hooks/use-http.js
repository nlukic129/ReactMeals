import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData && applyData(data);

      setIsLoading(false);
    } catch (error) {
      setError(error.message || "Something is wrong");
      setIsLoading(false);
    }
  }, []);

  return {
    sendRequest,
    error,
    isLoading,
  };
};

export default useHttp;
