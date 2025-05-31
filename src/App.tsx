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
    let userSessionValue = lookInSession({ key: "accessToken" });
    console.log(userSessionValue);

    userSessionValue
      ? setUserAuthToken({ userSessionValue })
      : setUserAuthToken({
          accessToken: null,
        });
    console.log(userAuthToken);
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
