import { createContext, useState } from "react";

interface ContextInterface {
  userAuthToken: { accessToken: string | null; profileImageUrl: string | null, username: string | null };
  setUserAuthToken: (token: {
    accessToken: string | null;
    profileImageUrl: string | null;
    username:string | null;
  }) => void;
}

export const CreateContext = createContext<ContextInterface>({
  userAuthToken: { accessToken: null, profileImageUrl:null, username:null },
  setUserAuthToken: () => {},
});

export const ContextProvider = ({ children }: { children: any }) => {
  // const [userAuthToken, setUserAuthToken] = useState<{accessToken: string | null}>({accessToken:null})
  const [userAuthToken, setUserAuthToken] = useState<{
    accessToken: string | null;
    profileImageUrl: string | null;
    username: string | null
  }>({
    accessToken: null,
    profileImageUrl: null,
    username: null
  });

  return (
    <CreateContext.Provider value={{ userAuthToken, setUserAuthToken }}>
      {children}
    </CreateContext.Provider>
  );
};
