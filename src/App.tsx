import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Saveurs from "./pages/Saveurs";
import Concept from "./pages/Concept";
import Coffrets from "./pages/Coffrets";
import PourquoiNous from "./pages/PourquoiNous";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saveurs" element={<Saveurs />} />
        <Route path="/concept" element={<Concept />} />
        <Route path="/coffrets" element={<Coffrets />} />
        <Route path="/pourquoi-nous" element={<PourquoiNous />} />
      </Routes>
    </Layout>
  );
}
