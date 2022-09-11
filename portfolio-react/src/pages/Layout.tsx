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
  let directionCSS = GetDirectionCSS(data.direction);
  
  // Set initial position
  SetSlidePosition(0, element, data, directionCSS);

  // Wait for delay to finish at minimum
  let delayFinished = false;
  setTimeout(() => {
    delayFinished = true;
  }, data.delay);

  // Don't check for load if we don't have to
  let loaded: boolean = false;
  if (!data.waitForLoad)
  {
    loaded = true;
  }

  // Check every 10ms that the delay is finished and the load is also finished
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

function GetDirectionCSS(direction: string)
{
  if (direction == 'left')
  {
    return `translateX(`;
  }
  else if (direction == 'right')
  {
    return `translateX(-`;
  }
  else if (direction == 'up')
  {
    return `translateY(`;
  }
  return `translateY(-`;
}

function StartSlideFade(element: HTMLElement, data: SlideFadeData, directionCSS: string)
{
  // Get starting time for delta time
  let startTime = Date.now();;

  // Set to 0 starting position
  SetSlidePosition(0, element, data, directionCSS);

  // Set transform styling if undefined
  if (!element.style.transform)
  {
    element.style.transform = '';
  }

  // Set opacity styling if undefined
  if (!element.style.opacity && data.fade)
  {
    element.style.opacity = '0';
  }

  let fadeInterval = setInterval(() => {

    // Calculate delta time
    let now = Date.now();
    let age = now - startTime;
    
    // Normalize the time range
    let t = (age / data.time);

    // If t > 1 we are finished, set exit flag
    let exit = false;
    if (t >= 1)
    {
      exit = true;
      t = 1;
    }

    // Run t through easing function
    let timeEasedNormalized = EaseOut(t);

    // Set the slide position based on the eased time
    SetSlidePosition(timeEasedNormalized, element, data, directionCSS);

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
  // Lerp from distance to 0
  let x: number = Lerp(data.distance, 0, t);

  // Set transform using directional CSS
  element.style.transform = `` + directionCSS + x +`px)`;
  
  // If we are fading also set the opacity
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
