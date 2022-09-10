import React, {useEffect, useRef} from 'react';
import logo from './logo.svg';
import '../App.css';
import {Outlet} from "react-router-dom";
import { clear } from 'node:console';

function Layout() {
  return (
  <>
    <Outlet />
    <Contact />
    <LoadingScreen />
  </>
  );
}

export function Contact()
{
  return(
  <div id="contact">
    <p><span className="grey-text">E-Mail</span> tnzgriff@gmail.com <span className="hide-on-mobile" style={{ float: 'right' }}>Website by Bryn Griffiths</span></p>
  </div>);
}

export function LoadingScreen()
{
  const loaderWrapper = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      FadeLoadingScreen(loaderWrapper.current!)
    }, 1500);

    window.addEventListener('load', (event) => {
      FadeLoadingScreen(loaderWrapper.current!);
    });
  }, []);

  return(
    <div ref={loaderWrapper} className="loader-wrapper">
      <img src={require("../images/loadingman.gif")}/>
    </div>
  )
}

function FadeLoadingScreen(loadingScreen: HTMLInputElement)
{
  // Check div for flag
  if (!loadingScreen.classList.contains("fading"))
  {
    // Add flag to div
    loadingScreen.classList.add("fading");

    // Get initial time for deltatime
    let lastUpdate = Date.now();
    let fadeInterval = setInterval(() => {

      // If no opacity is set, set it first
      if (!loadingScreen.style.opacity)
      {
        loadingScreen.style.opacity = '1';
      }

      // Calculate delta time
      let now = Date.now();
      let deltaTime = now - lastUpdate;
      lastUpdate = now;


      // If opacity is greater than 0 reduce opacity by delta time
      if (parseFloat(loadingScreen.style.opacity) > 0) {
        loadingScreen.style.opacity = String(parseFloat(loadingScreen.style.opacity) - 2 * (deltaTime / 1000));
      }
      else
      {
        // Stop the timer
        clearInterval(fadeInterval);
        loadingScreen.style.display='none';
      }
  }, 0);
  }
}

export default Layout;
