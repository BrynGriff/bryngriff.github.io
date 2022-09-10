import React, {useEffect, useRef} from 'react';
import logo from './logo.svg';
import '../App.css';
import {Outlet} from "react-router-dom";

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
    }, 1000);

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
  if (!loadingScreen.classList.contains("fadeOut"))
  {
    loadingScreen.classList.add("fadeOut");

    loadingScreen.onanimationend= (event) => {
      loadingScreen.style.display='none';
    }
  }
}

export default Layout;
