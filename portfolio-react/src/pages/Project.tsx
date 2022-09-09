import React from 'react';
import '../App.css';
import {projectData, miniProjectData} from '../projects.js';
import {Contact, LoadingScreen} from '../App';
import { basename } from 'node:path/win32';

interface Project{
  name: string;
  fullName: string;
  downloadLink: string;
  content: ProjectParagraph[];
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
  console.log(projectObject.fullName);
  console.log(projectObject.content);

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
  const images = [];
  for (let i = 0; i < 4; i++)
  {
    images.push(
    <img src={require(`../images/previews/${projectObject.name}/${i + 1}.png`)}></img>
    );
  }
  return (<>{images}</>);
}

interface ProjectObjectProps{
  projectObject: Project;
}
function ProjectText({projectObject} : ProjectObjectProps)
{
  const text = [];
  for (let i = 0; i < projectObject.content.length; i++)
  {
    text.push(
      <>
      <h1>{projectObject.content[i].header}</h1>
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
      <div id="project-banner-name">
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
