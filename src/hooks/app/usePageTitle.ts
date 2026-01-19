import { useEffect } from 'react';
import { useUI } from '../../context/UIProvider';

export function usePageTitle(title: string) {
  const { setTempTitle, resetTitle } = useUI();
  
  useEffect(() => {
    setTempTitle(title);
    return () => resetTitle();
  }, [title, setTempTitle, resetTitle]);
}