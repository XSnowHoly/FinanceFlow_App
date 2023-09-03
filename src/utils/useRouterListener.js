import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useRouterListener(callback) {
  const location = useLocation();

  useEffect(() => {
    callback(location);
  }, [callback, location]);
}

export default useRouterListener;
