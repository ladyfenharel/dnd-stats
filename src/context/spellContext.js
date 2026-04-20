import { createContext, useContext } from 'react';

export const SpellContext = createContext(null);

export function useSpells() {
  const ctx = useContext(SpellContext);
  if (!ctx) {
    throw new Error('useSpells must be used within a SpellProvider');
  }
  return ctx;
}
