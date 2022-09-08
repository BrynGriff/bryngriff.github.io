import React from 'react';
import '../App.css';
import {projectData, miniProjectData} from '../projects.js';
import {Contact} from '../App';

function Project() {
  let queryString = window.location.search;
  queryString = queryString.substring(1);

  if (queryString == "")
  {
      queryString = "0";
  }

  console.log(queryString);
  return (
    <div className="App">
      <div id="project-background">

      </div>
      <div id = "project-body">
        <div id="project-banner">
          <div id="project-banner-name">

          </div>
        </div>
        <div id="download-bar">
          <div id="navbuttons">
            <a href="index.html">
                <div id="back-button">Home</div>
            </a>
            <a id="download-link" target="_blank">
                <div id="download-button">Download</div>
            </a>
          </div>
        </div>
        <div id="project-body-images">

        </div>

        <div id = "project-body-text">              
          
        </div>
      </div>

      <Contact />
    </div>
  );
}

function Projects()
{
  const json = JSON.parse(projectData);
  const projects = [];
  for (let i = 0; i < json.length; i++)
  {
    let thumbnail, subtext, url, displayName: string;

    thumbnail = `images/thumbnails/` + json[i].name + `.png`;
    subtext = json[i].engine + ` - `+ json[i].year;
    url = `project.html?` + json[i].name;
    displayName = json[i].displayName;

    projects.push(<ProjectButton displayName={displayName} subtext={subtext} thumbnail={thumbnail} url={url}/>);
    
    if (i === 2)
    {
      thumbnail = 'images/thumbnails/miniprojects.png';
      displayName = 'Mini Projects';
      subtext = 'Unreal, C++, etc';
      url = 'miniprojects.html';
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

export default Project;
