song="";
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0;
right_wrist_y=0;
score_left_wrist=0;
score_right_wrist=0;
function preload(){
song=loadSound("music.mp3");
}


function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}


function draw(){
image(video,0,0,600,500);
fill("#ff0000");
stroke("#8c00ff");
if (score_left_wrist>0.2) {
    circle(left_wrist_x,left_wrist_y,20);
inNumber_left_wrist_y=Number(left_wrist_y)
remove_decimals=floor(inNumber_left_wrist_y)
volume=remove_decimals/500;
document.getElementById("vol").innerHTML="Volume="+volume;
song.setVolume(volume);
}
if (score_right_wrist>0.2) {
    circle(right_wrist_x,right_wrist_y,20);
    if (right_wrist_y>0 && right_wrist_y<=100) {
        document.getElementById("speed").innerHTML="speed-0.5x";
        song.rate(0.5);
    }else if(right_wrist_y>100 && right_wrist_y<=200){
     document.getElementById("speed").innerHTML="speed-1x";
     song.rate(1);
    }else if (right_wrist_y>200 && right_wrist_y<=300) {
        document.getElementById("speed").innerHTML="speed-1.5x";
        song.rate(1.5);
    }else if (right_wrist_y>300 && right_wrist_y<=400) {
        document.getElementById("speed").innerHTML="speed-2x"
        song.rate(2);
    }else if (right_wrist_y>400) {
        document.getElementById("speed").innerHTML="speed-2.5x";
        song.rate(2.5);
    }
    
}
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


function stop(){
    song.stop()
}


function modelLoaded(){
    console.log("model loaded");
}


function gotPoses(results){
if (results.length>0) {
    console.log(results);
    score_left_wrist=results[0].pose.keypoints[9].score;
    score_right_wrist=results[0].pose.keypoints[10].score;
    console.log(score_left_wrist);
    console.log(results);
    left_wrist_x=results[0].pose.leftWrist.x;
    left_wrist_y=results[0].pose.leftWrist.y;
    console.log("left wrist x="+left_wrist_x+"   left wrist y="+left_wrist_y)


    right_wrist_x=results[0].pose.rightWrist.x;
    right_wrist_y=results[0].pose.rightWrist.y;
    console.log("right wrist x="+right_wrist_x+"   right wrist y="+right_wrist_y)
    
}
}