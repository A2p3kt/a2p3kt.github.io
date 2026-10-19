import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch JSON data from public/data/
 * @param {string} endpoint - e.g. 'core-skills.json' or 'projects.json'
 */
export function useJsonData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
    const cleanEndpoint = endpoint.replace(/^\//, '');
    const url = `${basePath}/${cleanEndpoint.startsWith('data/') ? cleanEndpoint : `data/${cleanEndpoint}`}`;

    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load ${url} (HTTP ${res.status})`);
        }
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setData(json);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(`Error loading data from ${url}:`, err);
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
