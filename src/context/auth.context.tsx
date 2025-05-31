import { createContext, useState } from "react"

export const CreateContext = createContext({});

export const ContextProvider = ({children}:{children:any}) => {
    const [userAuthToken, setUserAuthToken] = useState({})
    return (
        <CreateContext.Provider value={{userAuthToken, setUserAuthToken}}>
            {children}
        </CreateContext.Provider>
    )
}