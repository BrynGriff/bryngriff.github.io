import React from 'react';
import '../App.css';
import {projectData, miniProjectData} from '../projects.js';

function Home() {
  document.title = "Bryn Griffiths - Portfolio";
  console.log("Rendering home");
  return (
    <div className="App">
      <div id="title-card">
        <div id="name-card">
          <h1>Bryn Griffiths</h1>
          <h2>Software Engineer</h2>
        </div>
      </div>
      <div id="info-card">
        <img src={require('../images/portrait.png')} alt=""></img>
        <div id="info-card-text">
          <h1>About Me</h1>
          <p>I am a Software Engineer based in New Zealand and recently graduated with a Bachelor's Degree in Software Engineering from Media Design School. I've been making programs and games for 3 years and most recently released my biggest project, Persist, on itch.io. My showcase features game projects, but I enjoy working on any kind of cool software.</p>
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
  for (let i = 0; i < json.length; i++)
  {
    let thumbnail, subtext, url, displayName: string;

    thumbnail = `images/thumbnails/` + json[i].name + `.png`;
    subtext = json[i].engine + ` - `+ json[i].year;
    url = `project?` + json[i].name;
    displayName = json[i].displayName;

    projects.push(<ProjectButton displayName={displayName} subtext={subtext} thumbnail={thumbnail} url={url}/>);
    
    if (i === 2)
    {
      thumbnail = 'images/thumbnails/miniprojects.png';
      displayName = 'Mini Projects';
      subtext = 'Unreal, C++, etc';
      url = 'miniprojects';
      projects.push(<ProjectButton displayName={displayName} subtext={subtext} thumbnail={thumbnail} url={url}/>);
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
}
function ProjectButton(props: ProjectButtonProps)
{
  return(
    <>
        <div className="project-button">
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
