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
      
      <ProjectBody/>
      <Contact />
    </div>
  );
}

function ProjectBody()
{
return(
  <>
  <div id="project-background">

  </div>
  <div id = "project-body">
    <div id="project-banner">
      <div id="project-banner-name">

      </div>
    </div>
    <div id="download-bar">
      <div id="navbuttons">
        <a href="/">
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
  </>
);
}

export default Project;
