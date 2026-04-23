import { useEffect, useState } from 'react';
import api from '../utils/api.js';

const useApi = (endpoint, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(endpoint);
        if (active) {
          const payload = Object.values(response.data).find((value) => Array.isArray(value)) ?? response.data;
          setData(payload);
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError.response?.data?.message || 'Something went wrong');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, [endpoint]);

  return { data, setData, loading, error };
};

export default useApi;
