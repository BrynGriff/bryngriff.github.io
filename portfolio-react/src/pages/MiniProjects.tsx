import React from 'react';
import '../App.css';
import {projectData, miniProjectData} from '../projects.js';
import { basename } from 'node:path/win32';
import {ProjectBody} from './Project';

interface MiniProject{
  name: string;
  fullname: string;
  downloadLink: string;
  imageExtension: string;
  description: string;
  engine: string;
}

function MiniProjects() {
  document.title="Mini Projects - Bryn Griffiths";
  const json: MiniProject[] = JSON.parse(miniProjectData);
  return (
    <div className="App">
      
      <ProjectBody name="Mini Projects" content={AllMiniProjectContent(json)} bannerPath = {`images/banners/persist.png`}/>

    </div>
  );
}

interface DownloadButtonProps {
  url:string;
}
function DownloadButton({url}:DownloadButtonProps)
{
  return(
    <a className="download-link" target="_blank" href={url}>
      <div className="miniproject-download-button">Download</div>
    </a>
  )
}

function AllMiniProjectContent(miniProjectData: MiniProject[]) : JSX.Element
{
  const miniProjects: JSX.Element[] = [];
  for (let i = 0; i < miniProjectData.length; i++)
  {
    miniProjects.push(MiniProjectContent(miniProjectData[i]));
    if (i != miniProjectData.length - 1)
    {
      miniProjects.push(
        <div className="between-line"/>
      )
    }
  }

  return(
    <>
    <div id="project-body-miniprojects">
      {miniProjects}
    </div>
    </>
  )
}

function MiniProjectContent(miniProject: MiniProject) : JSX.Element
{
  return(
    <>
    <div className="miniproject">
      <div className="miniproject-header">
        <div className="miniproject-title">
          <h1>{miniProject.fullname}</h1>
          <h2>{miniProject.engine}</h2>
        </div>
        {miniProject.downloadLink != "" && <DownloadButton url={miniProject.downloadLink}/>}
      </div>

      <br />
      <img src={require(`../images/previews/miniprojects/${miniProject.name}.${miniProject.imageExtension}`)} alt=""/>
      <div className="miniproject-text">
        {miniProject.description}
      </div>
      <br style={{clear: 'both'}}/>
    </div>
    </>
  );
}

export default MiniProjects;
