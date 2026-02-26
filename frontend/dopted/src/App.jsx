import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import PetDetails from "./pages/PetDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/pets/:id" element={<PetDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}