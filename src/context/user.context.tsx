import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { setUserDataSetter } from '../interceptor/axios-config';

type UserContextType = {
  userData: any | null;
  setUserData: React.Dispatch<React.SetStateAction<any | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    setUserDataSetter(setUserData);
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser deve ser usado dentro do UserProvider');
  return context;
};
