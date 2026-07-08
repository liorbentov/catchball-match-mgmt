import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

/**
 * Drop-in replacement for useLocalStorage that persists data in Firestore.
 * All users/sessions share the same data — reads are real-time via onSnapshot.
 */
export function useFirestoreStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValueInternal] = useState<T>(initialValue);
  // Keep a ref so the setter callback always closes over the latest value.
  const storedValueRef = useRef<T>(initialValue);
  storedValueRef.current = storedValue;

  useEffect(() => {
    const docRef = doc(db, 'appData', key);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setStoredValueInternal(snapshot.data().value as T);
      }
      // If the document doesn't exist yet, keep the initialValue in local state
      // until the first write creates it.
    });
    return unsubscribe;
  }, [key]);

  function setStoredValue(value: T | ((prev: T) => T)) {
    const resolved =
      typeof value === 'function'
        ? (value as (prev: T) => T)(storedValueRef.current)
        : value;
    // Optimistically update local state so the UI responds immediately.
    setStoredValueInternal(resolved);
    const docRef = doc(db, 'appData', key);
    void setDoc(docRef, { value: resolved });
  }

  return [storedValue, setStoredValue] as const;
}
