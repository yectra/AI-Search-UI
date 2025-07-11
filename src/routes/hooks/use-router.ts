import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export function useRouter() {
  const navigate = useNavigate();

  const router = useMemo(
    () => ({
      back: () => navigate(-1),
      forward: () => navigate(1),
      refresh: () => navigate(0),
      push: (href: string, state?: object) => navigate(href, { state }),
      replace: (href: string, state?: object) => navigate(href, { replace: true, state }),
    }),
    [navigate]
  );

  return router;
}
