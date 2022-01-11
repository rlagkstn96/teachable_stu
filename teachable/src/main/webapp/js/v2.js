// Normal Youtube link & Embedded youtube url samples for reference
// const EMBED_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
// const VIDEO_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

let URL = 'https://teachablemachine.withgoogle.com/models/AjHL2fmIL/';

let model, webcam, ctx, labelContainer, maxPredictions;


window.addEventListener('DOMContentLoaded', (event) => {

document.getElementById('begin-tutorial').addEventListener('click', renderTutorialView);

async function renderTutorialView() {
  const introView = document.querySelector('#intro-wrapper');
  const tutorialView = document.querySelector('#tutorial-wrapper');

  introView.style.display = await 'none';
  tutorialView.style.display = await 'flex';

  await videoElementPlay();
}
});

function launchApp() {
  const tutorialView = document.querySelector('#tutorial-wrapper');
  const loadingView = document.querySelector('#loading-wrapper');

  tutorialView.style.display = 'none';
  loadingView.style.display = 'block';
}

function blurScreen() {
  document.getElementById('app-wrapper').style.filter = 'blur(18px)';
  document.body.style.transition = '1.2s';
}

function noBlur() {
  document.getElementById('app-wrapper').style.filter = 'blur(0px)';
}

function videoElementPlay() {
  // The video element on the page to display the webcam
  const video = document.getElementById('myWebcam');
  let constraints = {
    audio: false,
    video: true
  };

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      // Attach to our video object
      video.srcObject = stream;
      // Wait for the stream to load enough to play
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(err) {
      alert(err);
    });

  const drawVideo = function() {
    // Draw the video onto the canvas
    context.drawImage(video, 0, 0, video.width, video.height);
    
    // Draw again every second
    setTimeout(drawVideo, 60);

  };

  drawVideo();
}

function largest(num1, num2, num3) {

  let neutral = 'neutral';
  let left = 'left';
  let right = 'right';

  if (num1 > num2 && num1 > num3) {
    // console.log("neutral -is greatest");
    return neutral

  } else if (num2 > num1 && num2 > num3) {
    // console.log("left -is greatest");
    return left

  } else if (num3 > num1 && num3 > num1) {
    // console.log("right is greatest");
    return right

  }
}

async function init() {
  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  const tutorialView = document.querySelector('#tutorial-wrapper');
  const loadingView = document.querySelector('#loading-wrapper');

  tutorialView.style.display = 'none';
  loadingView.style.display = 'block';

  // load the model and metadata
  // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
  // Note: the pose library adds 'tmPose' object to your window (window.tmPose)
  model = await tmPose.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Convenience function to setup a webcam
  const size = 600;
  const flip = true; // whether to flip the webcam
  webcam = new tmPose.Webcam(800, 600, flip); // width, height, flip
  await webcam.setup(); // request access to the webcam
  await webcam.play();
  // await webcam.hide();
  window.requestAnimationFrame(loop);

}

async function loop(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);
  // console.log(prediction);

  if (pose) {
    document.getElementById('app-wrapper').style.display = 'block';
    document.getElementById('embed-video').style.display = 'block';
    document.getElementById('tensorflow').style.display = 'block';
    document.getElementById('info').style.display = 'block';
    document.getElementById('inputs').style.display = 'flex';
    document.querySelector('#loading-wrapper').style.display = 'none';
  }

  let neutral_probablity = prediction[0].probability;
  let left_probablity = prediction[1].probability;
  let right_probablity = prediction[2].probability;

  let topResult = await largest(neutral_probablity, left_probablity, right_probablity);

  const goodState = document.querySelector('#good');
  const badState = document.querySelector('#bad');

  if (topResult === 'neutral') {
    noBlur();
    goodState.style.background = '#A5D6A7';
    goodState.style.color = '#263238';
    
    badState.style.background = 'rgba(255, 255, 255, 0.08)';
    badState.style.color = '#E0E0E0';
  } else if (topResult === 'left' || topResult === 'right') {
    //blurScreen();
	badState.innerHTML = topResult;
    badState.style.background = '#EF9A9A';
    badState.style.color = '#263238';

    goodState.style.background = 'rgba(255, 255, 255, 0.08)';
    goodState.style.color = '#E0E0E0';
  }
}

function drawPose(pose) {

}
