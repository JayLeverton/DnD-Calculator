import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Mining } from "./pages/mining";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Mining" element={<Mining />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
