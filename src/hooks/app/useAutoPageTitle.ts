import { useEffect } from 'react';
import { useTheme } from '../../context/UIProvider';

export function useAutoPageTitle() {
  const { setPageTitle, resetTitle } = useTheme();
  
  useEffect(() => {
    setPageTitle();
    return () => resetTitle();
  }, [setPageTitle, resetTitle]);
}