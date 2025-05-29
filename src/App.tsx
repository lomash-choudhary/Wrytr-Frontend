import "./App.css";
import NavBar from "./components/NavBar.component";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="signup" element={<h1>signup page</h1>} />
          <Route path="signin" element={<h1>sign in page</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
