import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import PetProfile from './pages/PetProfile'
import Register from './pages/Register'
import Browse from './pages/Browse'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/pet/:id" element={<PetProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </Router>
  </StrictMode>,
)
