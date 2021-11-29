song = "";

leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2)
    {
    circle(leftwristX, leftwristY, 20);
    number_leftwristY = Number(leftwristY);
    remove_decimal = floor(number_leftwristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}

    if(scoreRightWrist > 0.2)
    {
    circle(rightwristX, rightwristY, 20);
        if(rightwristY > 0 && rightwristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        if(rightwristY > 100 && rightwristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        if(rightwristY > 200 && rightwristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        if(rightwristY > 300 && rightwristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        if(rightwristY > 400 && rightwristY <= 500)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("Posenet's initialized.")
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + scoreLeftWrist + " Score Right Wrist = " + scoreRightWrist);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = " + leftwristX + " and left wrist Y = " + leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = " + rightwristX + " and right wrist Y = " + rightwristY);
    }
}
