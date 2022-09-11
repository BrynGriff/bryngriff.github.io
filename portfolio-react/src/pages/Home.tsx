import React from 'react';
import '../App.css';
import {projectData, miniProjectData} from '../projects.js';
import {CreateSlideFade} from './Layout';

function Home() {
  document.title = "Bryn Griffiths - Portfolio";

  return (
    <div className="App">
      <div id="title-card">
        <div id="name-card" data-slide-fade={CreateSlideFade(1000, 'right', 100, true)}>
          <h1>Bryn Griffiths</h1>
          <h2>Software Engineer</h2>
        </div>
      </div>
      <div id="info-card">
        <img src={require('../images/portrait.png')} alt="" data-slide-fade={CreateSlideFade(1000, 'down', 100, true, 500, true)}/>
        <div id="info-card-text">
          <h1>About Me</h1>
          <p data-slide-fade={CreateSlideFade(1000, 'left', 100, true)}>I am a Software Engineer based in New Zealand and recently graduated with a Bachelor's Degree in Software Engineering from Media Design School. I've been making programs and games for 3 years and most recently released my biggest project, Persist, on itch.io. My showcase features game projects, but I enjoy working on any kind of cool software.</p>
        </div>
      </div>

      <div id="project-list">
        <Projects />
      </div>


    </div>
  );
}

function Projects()
{
  const json = JSON.parse(projectData);
  const projects: JSX.Element[] = [];
  let buttonCount:number = 0;
  let buttonDelay = 100;
  for (let i = 0; i < json.length; i++)
  {
    let thumbnail, subtext, url, displayName: string;

    thumbnail = `images/thumbnails/` + json[i].name + `.png`;
    subtext = json[i].engine + ` - `+ json[i].year;
    url = `project?` + json[i].name;
    displayName = json[i].displayName;

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
