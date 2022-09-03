var titleSizeLarge = 30;
var titleSizeSmall = 25;

const json = JSON.parse(projectData);

function LoadHome()
{
    var projectList = document.getElementById('project-list');

    for(let i = 0; i < json.length; i++)
    {
        if (i == 3)
        {
            projectList.innerHTML += GenerateProjectButton('images/thumbnails/miniprojects.png', 'Mini Projects', 'Unreal, C++, etc', 'miniprojects.html');
        }
        var thumbnail = `images/thumbnails/` + json[i].name + `.png`;
        var displayName = json[i].displayName;
        var subtext = json[i].engine + ` - `+ json[i].year;
        var link = `project.html?` + json[i].name;
        projectList.innerHTML += GenerateProjectButton(thumbnail, displayName, subtext, link);
    }
}

function GenerateProjectButton(thumbnail, displayName, subtext, link)
{
    return `
              <div class="project-button">
                <div class="project-button-background" style="background-image: url('`+ thumbnail + `');"></div>
                <div class="project-button-text">
                    <h1>` + displayName + `</h1>
                    <h2>`+ subtext +`</h2>
                </div>
                <a href="` + link + `">
                    <div class="project-button-overlay"></div>
                </a>
              </div>
        `;
}

function LoadProject()
{
    var queryString = window.location.search;
    queryString = queryString.substring(1);

    var projectObject;
    if (queryString == "")
    {
        queryString = "0";
    }

    if (isNaN(queryString))
    {
        projectObject = json.find(element => element.name == queryString)
    }
    else
    {
        projectObject = json[parseInt(queryString)];
    }



    document.title = projectObject.fullName + " - Bryn Griffiths";

    document.getElementById('project-banner-name').innerHTML += `<h1>` + projectObject.fullName + `</h1>`;

    document.getElementById('project-banner').setAttribute("style", `background-image: url('images/banners/` + projectObject.name + `.png');`)

    document.getElementById('download-link').setAttribute("href", projectObject.downloadLink);

    document.getElementById('project-background').setAttribute("style", `background-image: url('images/banners/` + projectObject.name + `.png');`);

    var textElement = document.getElementById('project-body-text');
    if ('videoLink' in projectObject && projectObject.videoLink != "")
    {
        textElement.innerHTML += `<iframe class="project-video" src="`+ projectObject.videoLink + `" 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><div class='between-line'></div>`;
    }
    textElement.innerHTML += projectObject.content;

    var imagesElement = document.getElementById('project-body-images');

    for (let i = 1; i <= 4; i++)
    {
        imagesElement.innerHTML += `<img src="images/previews/`+ projectObject.name+ `/`+ i + `.png">`;
    }

    /*
    var folder = "images/";

    $.ajax({
        url : folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                    //$("body").append( "<img src='"+ folder + val +"'>" );
                    console.log(val);
                } 
            });
        }
    });
    */
}

function LoadMiniProjects()
{
    var miniProjectJson = JSON.parse(miniProjectData);
    var miniProjectsElement = document.getElementById('project-body-miniprojects');

    for (let i = 0; i < miniProjectJson.length; i++)
    {
        if (i != 0)
        {
            miniProjectsElement.innerHTML += `<div class='between-line'></div>`
        }
        var downloadButton = ``;
        if (miniProjectJson[i].downloadLink != "")
        {
            downloadButton = `
            <a id="download-link" href="` + miniProjectJson[i].downloadLink + `" target="_blank">
              <div class="miniproject-download-button">Download</div>
          </a>`
        }

        miniProjectsElement.innerHTML += downloadButton + `
          <div class="miniproject">
          <div class="miniproject-title">
            <h1>` + miniProjectJson[i].fullname + `</h1>
            <h2>` + miniProjectJson[i].engine + `</h2>
          </div>
          <br>
          <img src="images/previews/miniprojects/` + miniProjectJson[i].name + `.` + miniProjectJson[i].imageExtension + `">
          <div class="miniproject-text">
            ` + miniProjectJson[i].description + `
          </div>` + `` + `</div>
                    <br clear="both" />`
          ;
    }
}