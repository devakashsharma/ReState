import React, { createContext, useContext, ReactNode } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";
import { Redirect } from "expo-router";

// Define the structure of the User object
interface User {
  $id: string;
  name: string;
  email: string;
  avatar?: string; // Optional in case it's not always provided
}

// Define the structure of the GlobalContext
interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { data: user, loading, refetch } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLoggedIn = !!user; // Determine login status

  // // Redirect unauthenticated users to the login page
  // if (!loading && !isLoggedIn) {
  //   return <Redirect href="/login" />;
  // }

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        refetch: refetch as (newParams?: Record<string, string | number>) => Promise<void>,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;
