import { BrowserRouter as HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Mining } from "./pages/mining";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/DnD-Calculator/" element={<Home />}></Route>
          <Route path="/DnD-Calculator/Mining/" element={<Mining />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
