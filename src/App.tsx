import "./App.css";
import NavBar from "./components/NavBar.component";
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/userAuthForm.page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="signup" element={<UserAuthForm type="sign-up"/>} />
          <Route path="signin" element={<UserAuthForm type="sign-in"/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
