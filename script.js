var titleSizeLarge = 30;
var titleSizeSmall = 25;

const json = JSON.parse(projectData);

function LoadHome()
{
    var projectList = document.getElementById('project-list');

    for(let i = 0; i < json.length; i++)
    {
        projectList.innerHTML += 
        `
              <div class="project-button">
                <div class="project-button-background" style="background-image: url('images/thumbnails/` + json[i].name + `.png');"></div>
                <div class="project-button-text">
                    <h1>` + json[i].displayName + `</h1>
                    <h2>`+ json[i].engine + ` - `+ json[i].year + `</h2>
                </div>
                <a href="project.html?` + json[i].name + `">
                    <div class="project-button-overlay"></div>
                </a>
              </div>
        `
    }
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
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>`;
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