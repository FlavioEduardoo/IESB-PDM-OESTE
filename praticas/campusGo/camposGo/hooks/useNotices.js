import { useCallback, useEffect, useState } from 'react';
import { apiGet } from '../services/api';

export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiGet('/posts?_limit=10');
      setNotices(data);
    } catch (e) {
      setError(e.message || 'Erro ao carregar os avisos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { notices, isLoading, error, reload };
}