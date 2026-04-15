import { createContext, useState } from "react";

export const PitchContext = createContext();

export const PitchProvider = ({ children }) => {
    const [panels, setPanels] = useState([]);
    const [loader, setLoader] = useState(false);

    return (
        <PitchContext.Provider
            value={{
                panels,
                setPanels,
                loader,
                setLoader
            }}
        >
            {children}
        </PitchContext.Provider>
    );
};