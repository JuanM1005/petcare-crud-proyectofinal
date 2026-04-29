import { useEffect, useState } from 'react';

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

export const useFetch = <T>(url: string): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async (): Promise<void> => {
      setLoading(true);

      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error('Error en la petición');
        }

        const jsonData: T = await response.json();

        setData(jsonData);
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};
