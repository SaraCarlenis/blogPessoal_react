import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/NavBar";
import Home from "./pages/home/Home"
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Navbar />
    <div className="min-h-[80vh]">
    <Route path='/' element={<Home/>} />
    <Route path='/cadastro' element={<Cadastro/>} />
    <Route path='/login' element={<Login/>} />
    </Routes>
    </div>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
