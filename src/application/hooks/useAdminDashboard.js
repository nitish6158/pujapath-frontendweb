import { useCallback, useEffect, useState } from 'react';
import { pujaPathApi } from '../../infrastructure/api/pujaPathApi';

export function useAdminDashboard(token) {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await pujaPathApi.getAdminDashboard(token);
      setStats(response.data.stats || []);
    } catch (requestError) {
      setError(requestError.message || 'Unable to load dashboard');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    error,
    loading,
    reload: loadDashboard,
    stats,
  };
}
