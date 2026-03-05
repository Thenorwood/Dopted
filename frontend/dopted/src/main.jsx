import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import PetProfile from './pages/PetProfile'
import Register from './pages/Register'
import Browse from './pages/Browse'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/pets/:petId" element={<PetProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<Browse />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
