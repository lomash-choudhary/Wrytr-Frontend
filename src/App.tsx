import "./App.css";
import NavBar from "./components/NavBar.component";
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./app/userAuthForm.page";
import { ContextProvider, CreateContext } from "./context/auth.context";
import { useContext, useEffect } from "react";
import { lookInSession } from "./common/session";

function App() {
  return (
    <>
      <ContextProvider>
        <AppContext />
      </ContextProvider>
    </>
  );
}

function AppContext() {
  const { userAuthToken, setUserAuthToken }: any = useContext(CreateContext);

  useEffect(() => {
    let accessToken = lookInSession({ key: "accessToken" });
    let profileImageUrl = lookInSession({key: "profileImageUrl"});
    let username = lookInSession({key: "username"})

    accessToken
      ? setUserAuthToken({ accessToken, profileImageUrl, username })
      : setUserAuthToken({
          accessToken: null,
          profileImageUrl: null
        });

  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />
          <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
