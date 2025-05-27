
import { useState, useEffect } from 'react';

// fix: Update return type to allow functional updates for the setter
function useLocalStorage<T,>(key: string, initialValue: T): [T, (value: T | ((prevState: T) => T)) => void] {
  const getStoredValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  useEffect(() => {
    // This effect ensures that the state is synchronized with localStorage 
    // if it's updated by another tab or instance of the hook.
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(getStoredValue());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Initialize with current localStorage value in case it changed before listener was set
    setStoredValue(getStoredValue()); 

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]); // initialValue and getStoredValue are stable if initialValue itself is stable


  // fix: Update parameter type to allow functional updates
  const setValue = (value: T | ((prevState: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;