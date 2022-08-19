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
                <a href="project.html?` + i + `">
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
    if (queryString == "")
    {
        queryString = "0";
    }

    var projectObject = json[parseInt(queryString)];

    document.getElementById('project-banner-name').innerHTML += `<h1>` + projectObject.fullName + `</h1>`;

    var textElement = document.getElementById('project-body-text');
    console.log(projectObject.videoLink);
    if (projectObject.videoLink != "")
    {
        textElement.innerHTML += `<iframe class="project-video" src="`+ projectObject.videoLink + `" 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>`;
    }

    textElement.innerHTML += projectObject.content;

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