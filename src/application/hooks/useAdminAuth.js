import { useEffect, useState } from 'react';
import { pujaPathApi } from '../../infrastructure/api/pujaPathApi';
import { useLocalStorageState } from './useLocalStorageState';

export function useAdminAuth() {
  const [session, setSession] = useLocalStorageState('admin-session', {
    admin: null,
    token: '',
  });
  const [loading, setLoading] = useState(Boolean(session.token));
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    const validateSession = async () => {
      if (!session.token) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await pujaPathApi.getAdminMe(session.token);

        if (!ignore) {
          setSession((currentSession) => ({
            ...currentSession,
            admin: response.data.admin,
          }));
          setError('');
        }
      } catch (requestError) {
        if (!ignore) {
          setSession({ admin: null, token: '' });
          setError(requestError.message || 'Admin session expired');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    validateSession();

    return () => {
      ignore = true;
    };
  }, [session.token, setSession]);

  const login = async (credentials) => {
    setLoading(true);
    setError('');

    try {
      const response = await pujaPathApi.adminLogin(credentials);
      setSession({
        admin: response.data.admin,
        token: response.data.token,
      });
      return { ok: true };
    } catch (requestError) {
      const message = requestError.message || 'Unable to login';
      setError(message);
      return { ok: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setSession({ admin: null, token: '' });
    setError('');
  };

  return {
    admin: session.admin,
    error,
    isLoggedIn: Boolean(session.token),
    loading,
    login,
    logout,
    token: session.token,
  };
}
