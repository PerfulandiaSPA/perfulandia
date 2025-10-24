import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from '../pages/Login'
import Home from '../pages/Home'
import NavBar from '../components/Navbar';

function AppRoutes() {
     <NavBar.Link>
        <Link to="/">Home</Link> |{" "}
        <Link to="/Login">Login</Link> |{" "}
        
      </NavBar.Link>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>

    
}

    export default AppRoutes()