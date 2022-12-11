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

### ML5 and PoseNet

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

