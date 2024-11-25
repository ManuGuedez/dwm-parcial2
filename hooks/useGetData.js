import { useState, useEffect } from "react";

export default function useGetData({ url }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setData(data);
        setError(null);
      } else {
        setData(null);
        setError(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { getData, data, loading, error };
}
