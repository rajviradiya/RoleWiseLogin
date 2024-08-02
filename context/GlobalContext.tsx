import { Children, ReactNode, createContext, useContext, useState } from "react";

interface GlobalComps {
    data: any
}

const GlobalContext = createContext<GlobalComps | undefined>(undefined);

const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setdata] = useState<any>();

    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider

export const useGlobalContext = () => {

    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
