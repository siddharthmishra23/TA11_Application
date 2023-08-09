import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Usage from "./pages/Usage";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Aboutus from "./pages/Aboutus";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="usage" element={<Usage />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
