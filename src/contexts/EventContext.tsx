import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Event } from '../types';

interface EventContextType {
  currentEvent: Event | null;
  setCurrentEvent: (event: Event | null) => void;
  clearCurrentEvent: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}

export function EventProvider({ children }: EventProviderProps) {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const clearCurrentEvent = () => {
    setCurrentEvent(null);
  };

  return (
    <EventContext.Provider value={{ currentEvent, setCurrentEvent, clearCurrentEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
}
