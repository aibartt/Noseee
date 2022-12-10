//Open and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on("connect", function () {
  console.log("Connected");
});

// Code for an instanse of live web cam
// We got a new stream!
function gotStream(stream, id) {
  // This is just like a video/stream from createCapture(VIDEO)
}

// Declaring the variables
let video;
let poseNet;
let currPose;
let noseX = 0;
let noseY = 0;
let d;
let colors;
let currColor;
let canvas2;
let cnv;

// Setup function for my app
function setup() {
  cnv = createCanvas(640, 480);
  background("white");

  cnv.position(100, 180);

  canvas2 = createGraphics(640, 480);
  canvas2.clear();

  video = createCapture(VIDEO);
  video.hide();

  //PoseNet is a machine learning model that allows for Real-time Human Pose Estimation.
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.flipHorizontal = 1;
  poseNet.on("pose", gotPoses);

  colors = ["#B29DD9", "#FDFD98", "#FE6B64", "#77DD77", "#000000"];

  // Listening to data
  socket.on("data", function (obj) {
    // console.log(obj);
    drawPos(obj);
  });

  // Listening to clear signal to call clearCanvas()
  socket.on("clear", clearCanvas);
}

function modelReady() {
  console.log("model ready");
}

// confirming if the poseNet is getting the pose coordinates through the video
function gotPoses(poses) {
  if (poses.length > 0) {
    currPose = poses[0].pose;
  }
}

// Draw function
function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  //image(video, 0, 0);
  pop();

  // if poseNet identifies that currPose is true then it starst to define nose coordinates
  if (currPose) {
    noseX = lerp(noseX, currPose.nose.x, 0.7);
    noseY = lerp(noseY, currPose.nose.y, 0.7);

    d = dist(
      currPose.leftEye.x,
      currPose.leftEye.y,
      currPose.rightEye.x,
      currPose.rightEye.y
    );

    noStroke();
    colorBox();

    image(canvas2, 0, 0);
    canvas2.noStroke();

    // users can choose from 5 different colors in the colorbox above the drawing canvas
    for (i = 0; i < 5; i++) {
      if (key == i + 1) {
        currColor = i;
        canvas2.fill(colors[i]); // searches for the selected color in array
      }
    }
    // after all the needed variables were assigned the nosePos data is emitted to socket
    let nosePos = { x: noseX, y: noseY, dist: d, color: colors[currColor] };

    // to draw you need to hold the spacebar
    if (keyIsDown(32)) {
      socket.emit("data", nosePos);
    }
  }
}

function clearCanvas() {
  //context.clearRect(0, 0, canvas2.width, canvas2.height);
  canvas2.clear();
  clear(); //actually needs to clear the 2 canvas
  background("white");
}
// if users want to clear the drawing space they can do that by clicking "c" on keyboard
function keyPressed() {
  if (key == "c") {
    socket.emit("clear");
  }
}

// drawing the sketch using nose position of the user and the color selected
function drawPos(nosePos) {
  image(canvas2, 0, 0);
  canvas2.noStroke();
  canvas2.fill(nosePos.color);
  canvas2.ellipse(nosePos.x, nosePos.y, nosePos.dist * 0.2);
  noStroke();
}

//color Box where you can choose from 5 different colors and reset the drawing
function colorBox() {
  textAlign(LEFT);
  fill(216, 191, 216);
  rect(0, 0, width, 30);

  stroke(0, 0, 0);
  strokeWeight(1);
  textSize(20);
  fill(0, 0, 0);
  text("c = reset", 490, 20);

  noFill();
  strokeWeight(3);
  rect(70 * currColor, 2, 60, 27);

  for (i = 0; i < 5; i++) {
    fill(0, 0, 0);
    strokeWeight(1);
    text(i + 1 + " = ", 70 * i, 20);
    fill(colors[i]);
    ellipse(70 * i + 45, 15, 20);
  }
}

// Code for an instanse of live web cam
let sketch = function (p) {
  p.myVideo;
  p.otherVideo;

  p.setup = function () {
    let cnv = p.createCanvas(500, 300);
    cnv.position(800, 260);

    p.myVideo = createCapture(VIDEO, function (stream) {
      let p5l = new p5LiveMedia(
        this,
        "CAPTURE",
        stream,
        "CL_room1",
        "https://noseee.glitch.me/"
      );
      p5l.on("stream", (stream, id) => {
        p.otherVideo = stream;
        //otherVideo.id and id are the same and unique identifiers
        p.otherVideo.hide();
      });
    });
    p.myVideo.muted = true;
    p.myVideo.hide();
  };

  p.draw = function () {
    p.background(220);
    p.stroke(255);

    if (p.myVideo != null) {
      p.image(p.myVideo, 0, 0, p.width / 2, p.height); //not proportional for some reason
      p.text("My Video", 10, 10);
    }

    if (p.otherVideo != null) {
      // console.log(p.otherVideo);

      p.image(p.otherVideo, p.width / 2, 0, p.width / 2, p.height);
      p.text("Their Video", p.width / 2 + 10, 10);
    }
  };
};

// created sketch to utilzile 2 canvas on the same page at one time
let myp5 = new p5(sketch);
