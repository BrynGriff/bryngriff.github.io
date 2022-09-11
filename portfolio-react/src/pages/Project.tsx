import React from 'react';
import '../App.css';
import {projectData, miniProjectData} from '../projects.js';
import { basename } from 'node:path/win32';
import {CreateSlideFade} from './Layout';

interface Project{
  name: string;
  fullName: string;
  downloadLink: string;
  content: ProjectParagraph[];
  videoLink: string;
}

interface ProjectParagraph{
  header: string;
  paragraph: string;
}

function Project() {
  const json = JSON.parse(projectData);

  let queryString: string = window.location.search;
  queryString = queryString.substring(1);

  let projectObject: Project;
  if (queryString == "")
  {
      queryString = "0";
  }

  projectObject = json.find((element: Project) => element.name == queryString);
  
  document.title=projectObject.fullName + " - Bryn Griffiths";

  return (
    <div className="App">
      
      <ProjectBody name={projectObject.fullName} downloadUrl={projectObject.downloadLink} content={ProjectContent(projectObject)} bannerPath = {`images/banners/` + projectObject.name + `.png`}/>

    </div>
  );
}

interface DownloadButtonProps {
  url:string;
}
function DownloadButton({url}:DownloadButtonProps)
{
  return(
    <a id="download-link" target="_blank" href={url}>
      <div id="download-button">Download</div>
    </a>
  )
}

function ProjectContent(projectObject: Project)
{
  console.log(projectObject.fullName);

  return(
    <>
      <div id="project-body-images">
        <ProjectImages projectObject={projectObject}/>
      </div>

      <div id = "project-body-text">              
        <ProjectText projectObject={projectObject}/>
      </div>
    </>
  );
}

interface ProjectObjectProps{
  projectObject: Project;
}
function ProjectImages({projectObject} : ProjectObjectProps)
{
  let loadDelay = 100;
  const images = [];
  for (let i = 0; i < 4; i++)
  {
    images.push(
    <img src={require(`../images/previews/${projectObject.name}/${i + 1}.png`)} data-slide-fade={CreateSlideFade(500, 'left', 50, true, i * loadDelay, true)}></img>
    );
  }
  return (<>{images}</>);
}

// Creates the text section of the project page
interface ProjectObjectProps{
  projectObject: Project;
}
function ProjectText({projectObject} : ProjectObjectProps)
{
  const text = [];

  // Add video if there is a valid link
  if (typeof(projectObject.videoLink) != 'undefined')
  {
    text.push(
      <>
      <iframe className="project-video" src={projectObject.videoLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
      </iframe><br/>
      <div className='between-line'></div>
      </>
      );
  }

  // Adds each paragraph and header
  for (let i = 0; i < projectObject.content.length; i++)
  {
    let loadDelay = 200;
    text.push(
      <>
      <h1 data-slide-fade={CreateSlideFade(500, 'right', 50, true, loadDelay * i * 0.5)}>{projectObject.content[i].header}</h1>
      {projectObject.content[i].paragraph}
      {i != projectObject.content.length - 1 && <div className='between-line'/>}
      </>
    );
  }
  return (<>{text}</>);
}

interface ProjectBodyProps {
  name: string;
  downloadUrl?: string;
  content?: JSX.Element;
  bannerPath: string;
}
export function ProjectBody({name= "Test", downloadUrl="", content, bannerPath} : ProjectBodyProps)
{
return(
  <>
  <div id="project-background" style={{backgroundImage: `url(${require("../" + bannerPath)})`}}>
  </div>
  <div id = "project-body">
    <div id="project-banner" style={{backgroundImage: `url(${require("../" + bannerPath)})`}}>
      <div id="project-banner-name" data-slide-fade={CreateSlideFade(1000, 'down', 25, true)}>
        <h1>{name}</h1>
      </div>
    </div>
    <div id="download-bar">
      <div id="navbuttons">
        <a href="/">
            <div id="back-button">Home</div>
        </a>
        {downloadUrl != "" && <DownloadButton url={downloadUrl}/>}
      </div>
    </div>
    {content}
  </div>
  </>
);
}

export default Project;
