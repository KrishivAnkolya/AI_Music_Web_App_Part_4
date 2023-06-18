Peter_Pan_song = "";
Harry_potter_theme_song = "";
leftWristX = 0;
leftWristY = 0;
rightWrightX = 0;
rightWrightY = 0;
scoreleftWrist = 0;
song_Peter_Pan = "";

function preload() {
    music = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    song_Peter_Pan = Peter_Pan_song.isPlaying();
    console.log(song_Peter_Pan);
    fill("#37ff00");
    stroke("#ff0000");

    if(scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        Harry_potter_theme_song.stop();
        if(song_Peter_Pan == "false") {
            Peter_Pan_song.play();
        }
        else {
            
            document.getElementById("song").innerHTML = "song Name: Peter Pan";
        }
    }
}

function play() {
    music.play();
    music.setVolume(1);
    music.rate(1);
}

function modelLoaded() {
    console.log('PoseNet Is Initailized');
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.leftWrist.y;

        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}