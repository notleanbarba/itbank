import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.scss";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homebankinglayout from "./homebanking/layout";

createRoot(document.getElementById("root")!).render(<StrictMode>
    <Router>
    <Routes>
    <Route path='/homebanking/*' element={<Homebankinglayout />}/>
    </Routes>
  </Router></StrictMode>);

    