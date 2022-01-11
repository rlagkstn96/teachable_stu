const recordButton = document.querySelector(".record-button");
const stopButton = document.querySelector(".stop-button");
const playButton = document.querySelector(".play-button");
const downloadButton = document.querySelector(".download-button");
const previewPlayer = document.querySelector("#preview");
const recordingPlayer = document.querySelector("#recording");

const name = document.getElementById("name").value;//영상 제목 적는 부분 값 받는 곳

// setting
const recordingDuration = 15;
let recorder;
let recordedChunks;

// functions
function videoStart() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      previewPlayer.srcObject = stream;
      startRecording(
        previewPlayer.captureStream() || previewPlayer.mozCaptureStream()
      );
    });
}
function startRecording(stream) {
  recordedChunks = [];
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => recordedChunks.push(e.data);
  recorder.start();
}
function stopRecording() {
  previewPlayer.srcObject.getTracks().forEach((track) => track.stop());
  recorder.stop();
}

function playRecording() {
  const recordedBlob = new Blob(recordedChunks, { type: "video/mp4" });
  recordingPlayer.src = URL.createObjectURL(recordedBlob);
  recordingPlayer.play();
  
  downloadButton.href = recordingPlayer.src;
  console.log(name);
}

function DownloadRecording(){
  downloadButton.download = `drecording_${new Date()}.mp4`;//파일 명이 전달이 안되는데에
  alert("업로드 완료");
  window.close();
}

// event
recordButton.addEventListener("click", videoStart);
stopButton.addEventListener("click", stopRecording);
playButton.addEventListener("click", playRecording);
downloadButton.addEventListener("click", DownloadRecording);