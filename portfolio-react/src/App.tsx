import React, {useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {Outlet} from "react-router-dom";
import { url } from 'inspector';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";
import MiniProjects from "./pages/MiniProjects";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="project" element={<Project />} />
          <Route path="project.html" element={<Project />} />
          <Route path="miniprojects" element={<MiniProjects />} />
          <Route path="miniprojects.html" element={<MiniProjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
