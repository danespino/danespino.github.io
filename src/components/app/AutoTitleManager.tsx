import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/UIProvider';

export function AutoTitleManager() {
  const location = useLocation();
  const { setPageTitle } = useTheme();
  
  useEffect(() => {
    setPageTitle();
  }, [location.pathname, setPageTitle]);
  
  return null; // This component doesn't render anything
}