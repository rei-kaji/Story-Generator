import { createContext, useContext, useState } from "react";

const hostUrlValue = "https://story-generator.onrender.com";
const HostUrlContext = createContext();

export const HostUrlContextProvider = ({ children }) => {
  // const [hostUrl, setHostUrl] = useState(hostUrlValue);

  return (
    <HostUrlContext.Provider value={hostUrlValue}>
      {children}
    </HostUrlContext.Provider>
  );
};

export const useHostUrl = () => useContext(HostUrlContext);
