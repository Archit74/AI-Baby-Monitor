song = "";
Status = "";
objects =[];
function preload()
{
    song = loadSound("alert_alert.mp3");
}

function setup()
{
    canvas = createCanvas(500,400);
    canvas.center();
    classifier = ml5.objectDetector('cocossd', modelloaded);
    video = createCapture(VIDEO);
    video.hide();
    video.size(500, 400)
    
    document.getElementById("status").innerHTML = "Status : Dectecting Object";

}

function modelloaded()
{
console.log("modelloaded");
Status = true; 
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
console.log(results);
objects = results ;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);

        if(Status != "")
        {
          r =  random(255);
          g =  random(255);
          b =  random(255);      
          classifier.detect(video, gotResult);
          for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
   
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           
            if(objects[i].label == "person")
            {
              document.getElementById("found").innerHTML = "Baby Found";
              console.log("stop");
              song.stop();
            }
            else
            {
              document.getElementById("found").innerHTML = "Baby Not Found";
              console.log("play"); 
              song.play();
            }
           }
  
          if(objects.length == 0)
          {
            document.getElementById("found").innerHTML = "Baby Not Found";
            console.log("play"); 
            song.play();
          }
        }
  }
  

