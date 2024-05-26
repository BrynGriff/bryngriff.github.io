import React from 'react';
import '../App.css';
import {projectJSON, miniProjectData} from '../projects.js';
import {CreateSlideFade} from './Layout';

function Home() {
  document.title = "Bryn Griffiths - Portfolio";

  return (
    <div className="App">
      <div id="title-card">
        <div id="name-card">
          <h1 data-slide-fade={CreateSlideFade(1000, 'right', 100, true)}>Bryn Griffiths</h1>
          <h2 data-slide-fade={CreateSlideFade(1000, 'right', 50, true, 500)}>Software Engineer</h2>
        </div>
      </div>
      <div id="info-card">
        <img src={require('../images/portrait.png')} alt="" data-slide-fade={CreateSlideFade(1000, 'down', 100, true, 500, true)}/>
        <div id="info-card-text">
          <h1>About Me</h1>
          <p data-slide-fade={CreateSlideFade(1000, 'left', 100, true)}>I am a Software Engineer based in New Zealand, currently working in the games industry. I've been developing games and software for 5 years, spanning various genres, and for the past 2 years, I've focused on virtual reality projects. My portfolio includes game and web projects, but I enjoy working on any kind of cool software.</p>
        </div>
      </div>

      <div id="project-list">
        <Projects />
      </div>


    </div>
  );
}

// Creates all projects
function Projects()
{
  const projectData = JSON.parse(projectJSON);
  const projects: JSX.Element[] = [];
  let buttonCount: number = 0;
  
  let buttonDelay: number = 100;

  // Create button elements
  for (let i = 0; i < projectData.length; i++)
  {
    let thumbnail, subtext, url, displayName: string;

    // Set button data from JSON
    thumbnail = `images/thumbnails/` + projectData[i].name + `.png`;
    subtext = projectData[i].engine + ` - `+ projectData[i].year;
    url = `project?` + projectData[i].name;
    displayName = projectData[i].displayName;

    projects.push(<ProjectButton key={i} displayName={displayName} subtext={subtext} thumbnail={thumbnail} url={url} delay={buttonDelay * buttonCount}/>);
    buttonCount++;
    
    if (i === 2)
    {
      thumbnail = 'images/thumbnails/miniprojects.png';
      displayName = 'Mini Projects';
      subtext = 'Unreal, C++, etc';
      url = 'miniprojects';
      projects.push(<ProjectButton key={5000} displayName={displayName} subtext={subtext} thumbnail={thumbnail} url={url} delay={buttonDelay * buttonCount}/>);
      buttonCount++;
    }
  }

  return(<>{projects}</>);
}

type ProjectButtonProps =
{
  displayName: string;
  subtext: string;
  thumbnail: string;
  url: string;
  delay: number;
}
function ProjectButton(props: ProjectButtonProps)
{
  return(
    <>
        <div className="project-button" data-slide-fade={CreateSlideFade(500, 'up', 100, true, props.delay)}>
          <div className="project-button-background" style={{backgroundImage: `url(${require("../" + props.thumbnail)})`}}></div>
          <div className="project-button-text">
            <h1>{props.displayName}</h1>
            <h2>{props.subtext}</h2>
          </div>
          <a href={props.url}>
            <div className="project-button-overlay"></div>
          </a>
      </div>
      </>
  )
}

export default Home;
