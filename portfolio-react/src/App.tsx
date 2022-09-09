import React, {useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {projectData, miniProjectData} from './projects.js';
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
          <Route path="miniprojects" element={<MiniProjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export function Contact()
{
  return(
  <div id="contact">
    <p><span className="grey-text">E-Mail</span> tnzgriff@gmail.com <span className="hide-on-mobile" style={{ float: 'right' }}>Made with React by Bryn Griffiths</span></p>
  </div>);
}

export function LoadingScreen()
{
  const loaderWrapper = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeOutId = setTimeout(() => FadeLoadingScreen(loaderWrapper.current!), 2000);
    window.addEventListener('load', (event) => {
      FadeLoadingScreen(loaderWrapper.current!);
    });
  }, []);

  return(
    <div ref={loaderWrapper} className="loader-wrapper">
      <img src={require("./images/loadingman.gif")}/>
    </div>
  )
}

function FadeLoadingScreen(loadingScreen: HTMLInputElement)
{
  if (!loadingScreen.classList.contains("fadeOut"))
  {
    loadingScreen.classList.add("fadeOut");

    loadingScreen.onanimationend= (event) => {
      loadingScreen.style.display='none';
    }
  }
}

export default App;
