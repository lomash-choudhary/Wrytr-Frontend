import { createContext, useState } from "react"

export const CreateContext = createContext<AuthContextType>({
    userAuthToken:{accessToken:null},
    setUserAuthToken:() => {}
});

export const ContextProvider = ({children}:{children:any}) => {
    const [userAuthToken, setUserAuthToken] = useState<{accessToken: string | null}>({accessToken:null})
    return (
        <CreateContext.Provider value={{userAuthToken, setUserAuthToken}}>
            {children}
        </CreateContext.Provider>
    )
}

interface AuthContextType{
    userAuthToken: {accessToken: string | null}
    setUserAuthToken: (token: {accessToken: string | null}) => void
}