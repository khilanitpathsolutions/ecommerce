import React, { createContext, useState } from "react";
import Routing from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const UserContext = createContext({});

const App = () => {
  const [context, setContext] = useState({});
  const [like,setLike] = useState({})

  return (
    <>
      <UserContext.Provider value={{ context,setContext,like,setLike }}>
        <Routing />
      </UserContext.Provider>
    </>
  );
};

export default App;
