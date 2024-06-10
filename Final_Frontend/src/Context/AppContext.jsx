import React from "react";
import { createContext, useState } from "react";

const AppContext = createContext("");

function ContextProvider({ children }) {
  const [IsAuthorized, setIsAuthorized] = useState(true);
  const [User, setUser] = useState({});


  



  return (
    <AppContext.Provider
      value={{ IsAuthorized, setIsAuthorized, User, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;
export { AppContext };
