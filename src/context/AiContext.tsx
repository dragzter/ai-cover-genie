"use client";

import { createContext, useContext, useState } from "react";

const AiContext = createContext<any>(null);
export const MainDataContext = createContext<any>(null);

export const AiContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  return (
    <AiContext.Provider value={{ data, setData, setUserData, userData }}>
      {children}
    </AiContext.Provider>
  );
};

export const useAiContext = () => {
  const context = useContext(AiContext);
  if (context === undefined) {
    throw new Error("useAiContext must be used within a AiContextProvider");
  }
  return context;
};
