import './App.css';
import './Kanbas/styles.css';
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import Courses from "./Kanbas/Courses";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";


export default function App() {
  return (
    <HashRouter>
    <div className="content">

      </div>
      <div>
        <Routes>
          <Route path="/courses/:cid/*" element={<Courses />} />
          <Route path="/" element={<Navigate to="Kanbas" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  );
}