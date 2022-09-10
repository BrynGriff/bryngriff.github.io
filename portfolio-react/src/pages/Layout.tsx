import React, {useEffect, useRef} from 'react';
import logo from './logo.svg';
import '../App.css';
import {Outlet} from "react-router-dom";
import { clear } from 'node:console';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
import { BooleanLiteral } from 'typescript';

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
    OnLoad();

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

function OnLoad()
{
  let classTest = document.querySelectorAll<HTMLElement>('[data-slide-fade]');
  for (let i = 0; i < classTest.length; i++)
  {
    let slideFadeData = JSON.parse(classTest[i].getAttribute('data-slide-fade')!) as SlideFadeData;
    SlideFadeIn(classTest[i], slideFadeData);

  }
}

export function CreateSlideFade(time: number = 1000, direction: string = 'down', distance:number = 100, fade:boolean = true, delay:number = 0, waitForLoad:boolean = false)
{
  return JSON.stringify({fade, time, direction, distance, delay, waitForLoad});
} 

export interface SlideFadeData {
  fade: boolean;
  time: number;
  direction: string;
  distance: number;
  delay: number;
  waitForLoad: boolean;
}

export function SlideFadeIn(element: HTMLElement, data: SlideFadeData)
{
  element.setAttribute('transitioning', 'true');
  element.classList.add("block-transitions");
  let directionCSS = "";
  if (data.direction == 'left')
  {
    directionCSS = `translateX(`
  }
  else if (data.direction == 'right')
  {
    directionCSS = `translateX(-`
  }
  else if (data.direction == 'up')
  {
    directionCSS = `translateY(`
  }
  else
  {
    directionCSS = `translateY(-`
  }
  
  SetSlidePosition(0, element, data, directionCSS);
  let delayFinished = false;
  setTimeout(() => {
    delayFinished = true;
  }, data.delay);

  let loaded: boolean = false;
  if (!data.waitForLoad)
  {
    loaded = true;
  }
  let waitInterval = setInterval(() => {
    if (!loaded)
    {
      if ((element as HTMLImageElement).complete)
      {
        loaded = true;
      }
    }
    if (delayFinished && loaded)
    {
      StartSlideFade(element, data, directionCSS);
      clearInterval(waitInterval);
    }
  }, 10);
}

function StartSlideFade(element: HTMLElement, data: SlideFadeData, directionCSS: string)
{
  let startTime = 0;

  SetSlidePosition(0, element, data, directionCSS);

  let setStartingTime = false;
  let fadeInterval = setInterval(() => {

    if (!setStartingTime)
    {
      setStartingTime = true;
      startTime = Date.now();
    }

    // If no opacity is set, set it first
    if (!element.style.transform)
    {
      element.style.transform = '';
    }

    if (!element.style.opacity && data.fade)
    {
      element.style.opacity = '0';
    }

    // Calculate delta time
    let now = Date.now();
    let age = now - startTime;
    
    let t = (age / data.time);
    let exit = false;

    if (t >= 1)
    {
      exit = true;
      t = 1;
    }

    let lerpValue = EaseOut(t);

    SetSlidePosition(lerpValue, element, data, directionCSS);

    if (exit)
    {
      // Stop the timer
      element.style.transform = '';
      element.classList.remove("block-transitions");
      clearInterval(fadeInterval);
    }
}, 0);
}

function SetSlidePosition(t: number, element: HTMLElement, data: SlideFadeData, directionCSS: string)
{
  let x: number = Lerp(data.distance, 0, t);

  element.style.transform = `` + directionCSS + x +`px)`;
  
  if (data.fade)
  {
    element.style.opacity = String(t);
  }
}

function InverseLerp (start: number, end: number, value: number){
  return (value - start) / (end - start);
}

function Lerp (start: number, end: number, value: number){
  return (1-value)*start+value*end
}

function EaseOut(x: number)
{
    return 1 - pow(1 - x);
}

function pow(x: number)
{
  return x * x * x;
}

export default Layout;
