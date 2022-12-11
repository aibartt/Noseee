# Documentation of Noseee


Working Link: https://noseee.glitch.me/

## Project Description

## Overview
Noseee is an online real-time collaborative application where people can create their own drawings using their nose movements. The project uses Socket.io for realtime multiplayer connections, ML5 client-side javascript library for identifyng the coordinates of nose position by PoseNet and WebRTC for streaming the videos of players. Users can choose the color of the  brush by clicking numbers on keyboard and clean the drawing space with "c" keypress.

## Idea, Concept and Inspiration

I decided to try something new and create a project using p5 and ml5 client side javascript libraries. The idea was to create a colloborative application where different users could contribute in some way to the common form of art or composition. After some brainstorming I thought that creating an app which stimulates some physical activity would be a good idea. But dragging the mouse is not a big deal, right? I need something more interesting and potentially useful. As a CS major I use my laptop for more than 10 hours every day. Unsurprisingly, I started to experience neck and back pain because of countless hours staring at a computer screen. Naturally, you will begin to experience fatigue staying in the same position for hours, which then leads to bad posture and a strain on your cervical vertebrae. This is the cause of upper back and neck pain, sore shoulders and even lumbar pain in your lower back. Millions of other people acrooss the world experience the same symptoms but not everyone can notice it and take decisive actions to confront it. That's how I came acrooss the idea of using the users's nose position to draw on this application. Noseee will not only be an entertaining break for users but will also stimulate their neck muscles with physical activity.

## Wireframing
I created a simple wireframe of the website before strating the development process.

![](images/1.jpeg)

## User Experience & Design
User Interface of my appliaction is pretty straightforward: header, short descripton of the project and user instructions on the top of the page. It has 2 canvas: 
1) Drawing Canvas 
2) Real-time Video Communication Panel

![](images/img2.png)

Users can choose the color of the  brush by clicking numbers on keyboard and start drawing by holding spacebar. You can draw almost anything with this app! You can cooloborate with your friend and come up with an abstract form of composition. If you want to clear the drawing canvas just press "c" on the keyboard it will automatically clean up drawing space for both users. 

### Below is the sample of UI&UX:

<img src="https://github.com/aibartt/Noseee/blob/main/2.gif"  width="800"/>


### User Testing
During user testing in class, I received various feedback from my classmates, and it was really helpful when making some design and development decisions.
Initially, I did not have any user control for drawing, it was drawing all the time. But I recieved a feedback about this and decided to add functionality to utilize the spacebar for drawing. 
Hasibur pointed out a bug where if the user goes out the frame it draws random lines, it was  due to not confirming that poseNet is getting the poses of the user. It was succesfully resolved by adding this code for confirming if the poseNet is getting the pose coordinates through the video.

    function gotPoses(poses) {
      if (poses.length > 0) {
        currPose = poses[0].pose;
      }
    }

I also received some feedback about using fingers or hand to draw instead of the nose movements. But because I wanted to develop an application that is potentially useful. I decided to keep my initial idea of stimulatating user's neck muscles with physical activity.

## Technical Design and What I learned from this Final Project

### Socket.io

Sockets was added to the HTTP server that was built over the express app. This application uses socket.io for the realtime sharing of information between the server and the clients. Having a drawing element and visual communictaion required me to make all the information exchange as realtime as possible, and sockets had a huge role in helping me do so.

    // Express is a node module for building HTTP servers
    let express = require("express");
    let http = require("http");
    let app = express();

    // We pass in the Express object and the options object
    let httpServer = http.createServer(app);

    // WebSocket Portion
    // WebSockets work with the HTTP server

    let io = require("socket.io");
    io = new io.Server(httpServer);
    
Using sockets I was able to receive the realtime nose positions of different players and the color of drawing using nosePos variable, and then send the data to all clients, including this one on the server side.

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

When the user pressed the spacebar the "data" messegae would be emitted and nosePos will be passed as argument to drawPos() function which will draw the sketch for both clients. Server side code for exchanging data:

    // //Listen for a message named 'data' from this client
      socket.on("data", function (data) {
        //checking if data was received
        console.log("Received: 'data' " + data);

        //Send the data to all clients, including this one
        //Set the name of the message to be 'data'
        io.sockets.emit("data", data);
      });


### ML5 and PoseNet

ML5 is a clinet side library that provides access to machine learning algorithms and models in the browser, building on top of TensorFlow.js with no other external dependencies. In my project I utilized the PoseNet a machine learning model that allows for Real-time Human Pose Estimation. 

I was able to link the video of the user and get the real-time nose positions using below code:

      video = createCapture(VIDEO);
      video.hide();

      //PoseNet is a machine learning model that allows for Real-time Human Pose Estimation.
      poseNet = ml5.poseNet(video, modelReady);
      poseNet.flipHorizontal = 1;
      poseNet.on("pose", gotPoses);
      
After confirming that the poseNet is getting the pose coordinates through the video, I stored the x and y coordinates of nose position and dist variable for higher accuracy when sketching:

        noseX = lerp(noseX, currPose.nose.x, 0.7);
        noseY = lerp(noseY, currPose.nose.y, 0.7);

        d = dist(
          currPose.leftEye.x,
          currPose.leftEye.y,
          currPose.rightEye.x,
          currPose.rightEye.y
        );

In my initial version/draft of Finakl Project I started by first detecting the nose position and drawing litte red circle to observe the nose movements:

<img src="https://github.com/aibartt/Noseee/blob/main/1.gif"  width="800"/>

### WebRTC



## Key Challenges and Solutions


## Potential next steps


## Relevant references/resources 

• [Node JS](https://nodejs.org/en/)

• [Express JS](https://expressjs.com/)

• [Socket.io](https://socket.io/)

• Connections Lab Course Materials
  https://github.com/MathuraMG/ConnectionsLab-NYUAD
  
• https://lensesforsnap.com/nose-draw-snapchat-lens-filter/

• https://editor.p5js.org/bluejaywalk/sketches/5m0HNTBGz

• https://www.youtube.com/watch?v=jmznx0Q1fP0

