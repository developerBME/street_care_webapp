import { createContext,useContext,useState } from "react";
import { Outlet } from "react-router-dom";

const context = createContext();

export const PastOutreachEventProvider = ({ children }) => {
  const sevenDaysAgo = () => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  };
  const [pastOutreachEventState, setPastOutreachEventState] = useState({
    pageSize: 6,
    lastVisible: null,
    debouncedCityToSearch : "",
    debouncedSearchTerm: "",
    startDateTime: sevenDaysAgo(),
    endDateTime: new Date(),
    pageHistory: [],
    direction: "next"
  });
  return (
    <context.Provider value={{pastOutreachEventState, setPastOutreachEventState}}>
      {children}
    </context.Provider>
  );
}

export const PastOutreachContext = () => {
    return useContext(context);
}

export const PastOutreachOutlet = () => {
  return (
    <PastOutreachEventProvider>
      <Outlet />
    </PastOutreachEventProvider>
  )
}

