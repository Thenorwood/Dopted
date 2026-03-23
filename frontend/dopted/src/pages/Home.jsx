import { useState, useEffect } from "react";
/*
import Navbar from "../components/layout/Navbar.jsx";
import Login from "./Login";
import Register from "./Register";*/
import { Link } from "react-router-dom";

function Home() {
  const [Pets, setPets] = useState([]);
  const API_URL = import.meta.env.VITE_PETS_API_URL;

  useEffect(() => {
   const getPets = async () => { 
    const response = await fetch(API_URL);
    const data = await response.json();

    if (response.ok) {
      setPets(data);

    }
}
    getPets();

  }, [])

  return (
    <>
     <div className="container text-center my-5">

      <img
        src="/Dopted.png"
        alt="Dopted Logo"
        className="img-fluid mx-auto mb-4"
        style={{ maxWidth: "400px" }}
      />

      <h1 className="text-black fw-bold display-4 text-shadow">
        Dopted!
      </h1>

          <div>
            <p className="text-600 fs-4">
                 Dopted is here to connect loving families with pets in need of a forever home.
            </p>
            <p>Come and join us in this mission to make a difference in the lives of animals in need.</p>
            </div>

              <div className="container my-4">
                <div className="card-body">
                <Link to="/Login" className="btn btn-primary btn-lg">
                  Login
                </Link>
                <Link to="/Register" className="btn btn-secondary btn-lg">
                  Register
                </Link>
                <Link to="/browse" className="btn btn-success btn-lg">
                  Browse Pets
                </Link>
              </div>
              </div>
            </div>
        
    </>
  );
}
export default Home