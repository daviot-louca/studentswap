import { createContext } from "react";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={null}>
      {children}
    </SocketContext.Provider>
  );
}