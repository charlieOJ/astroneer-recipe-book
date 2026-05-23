import { useEffect, useState } from "react";

const useFetch = (fetchingFn: () => Promise<{ resources: any }>, initialData?: any) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<null | any[]>(null);
  const [fetchedData, setFetchedData] = useState<null | any>(initialData);

  useEffect(() => {
    const fetching = async () => {
      setIsFetching(true);

      try {
        const data = (await fetchingFn()) as any;
        setFetchedData(data);
      } catch (error: any) {
        setError(error.message || "Could not fetch data. Try again later.");
      }

      setIsFetching(false);
    };

    fetching();
  }, [fetchingFn]);

  return { isFetching, error, fetchedData, setFetchedData };
};

export default useFetch;
