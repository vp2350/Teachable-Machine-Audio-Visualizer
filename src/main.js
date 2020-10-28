	/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!
const drawParams ={
    showGradient: false,
    showBars: false,
    showCircles: true,
    showNoise: false,
    showInvert: false,
    showEmboss: false,
    showTint: false,
    tintStyle: "Magenta",
    duration: 0,
    currentTime: 0,
    bouncingLines: false,
    useWaveForm: false,
    quadraticCurves: true
};

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';


// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/New Adventure Theme.mp3"
});

const playButton = document.querySelector("#playButton");    
let trackSelect= document.querySelector("#trackSelect");
let tintSelect= document.querySelector('input[name="tint"]:checked');
let dataSelect= document.querySelector("#dataType");
let freezeCooldown = false;
let counter = 0;

function init(){
    audio.setupWebAudio(DEFAULTS.sound1);

	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
	setupUI(canvasElement);
    canvas.setupCanvas(canvasElement,audio.analyserNode);
    var video = document.querySelector("#videoElement");
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err0r) {
          //console.log("Something went wrong!");
        });
    }
    loop();
    update();
}

function update(){
    if(audio.getDuration() != null)
    {
        drawParams.duration = Math.floor(audio.getDuration());
        drawParams.currentTime = Math.floor(audio.getCurrent());
    }
    if(!freezeCooldown) counter-=2;
    
    if(counter>0)
    {
        document.querySelector("#cooldown").innerHTML = "Cooldown: "+  Math.floor(counter/60);
    }
    else
    {
        document.querySelector("#cooldown").innerHTML = "Cooldown: "+ 0;
    }
    requestAnimationFrame(update);
    let label = document.querySelector("#label-container");
    let handSign;
    for(let i=0; i<label.childElementCount; i++)
    {
        let valueString = label.childNodes[i].innerHTML;
        let floatValue=parseFloat(valueString.substring(valueString.length-4));
        if(floatValue > 0.90)
        {
            let words = valueString.split(" ");
            handSign = words[0];
            console.log(handSign);
        }
    }
    if(counter<0)
    {
        if(handSign == "Vulcan")
        {
            counter = 600;
            trackSelect.value = "media/The Picard Song.mp3";
            trackSelect.dispatchEvent(new MouseEvent("change"));
            
            console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

            //check if context is in suspended state (autoplay policy)
            if(audio.audioCtx.state== "suspended"){
                audio.audioCtx.resume();
            }

            console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
            //if(e.target.dataset.playing == "no"){
                //if track is currently paused, play it
                audio.playCurrentSound();
                playButton.dataset.playing = "yes"; //our CSS will set the text to pause
                //if track is playing, pause it
            //
            //else{
            //    audio.pauseCurrentSound();
            //    e.target.dataset.playing = "no"; //our CSS will set the text to play
            //}    
        }
        else if(handSign == "Rock")
        {
            counter = 600;
            trackSelect.value = "media/Peanuts Theme.mp3";
            trackSelect.dispatchEvent(new MouseEvent("change"));

            console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

            //check if context is in suspended state (autoplay policy)
            if(audio.audioCtx.state== "suspended"){
                audio.audioCtx.resume();
            }

            console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
            //if(e.target.dataset.playing == "no"){
                //if track is currently paused, play it
                audio.playCurrentSound();
                playButton.dataset.playing = "yes"; //our CSS will set the text to pause
                //if track is playing, pause it
            //
            //else{
            //    audio.pauseCurrentSound();
            //    e.target.dataset.playing = "no"; //our CSS will set the text to play
            //}    
        }
        else if(handSign == "Thumbs")
        {
            counter = 600;
            trackSelect.value = "media/New Adventure Theme.mp3";
            trackSelect.dispatchEvent(new MouseEvent("change"));

            console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

            //check if context is in suspended state (autoplay policy)
            if(audio.audioCtx.state== "suspended"){
                audio.audioCtx.resume();
            }

            console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
            //if(e.target.dataset.playing == "no"){
                //if track is currently paused, play it
                audio.playCurrentSound();
                playButton.dataset.playing = "yes"; //our CSS will set the text to pause
                //if track is playing, pause it
            //
            //else{
            //    audio.pauseCurrentSound();
            //    e.target.dataset.playing = "no"; //our CSS will set the text to play
            //}    
        }
    }
}
function loop(){
    
	requestAnimationFrame(loop);
    tintSelect= document.querySelector('input[name="tint"]:checked');
	drawParams.tintStyle =tintSelect.value;
    canvas.draw(drawParams);

	// 1) create a byte array (values of 0-255) to hold the audio data
	// normally, we do this once when the program starts up, NOT every frame
	let audioData = new Uint8Array(audio.analyserNode.fftSize/2);

	// 2) populate the array of audio data *by reference* (i.e. by its address)
	audio.analyserNode.getByteFrequencyData(audioData);

}

function setupUI(canvasElement){
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");
    // add .onclick event to button
    fsButton.onclick = e => {
      console.log("init called");
      utils.goFullscreen(canvasElement);
    };
    
    document.querySelector('#gradientCB').onchange = e => {
      drawParams.showGradient = e.target.checked;
    };
    document.querySelector('#barsCB').onchange = e => {
      drawParams.showBars = e.target.checked;
    };
    document.querySelector('#bouncingCB').onchange = e => {
      drawParams.bouncingLines = e.target.checked;
    };
    document.querySelector('#circlesCB').onchange = e => {
      drawParams.showCircles = e.target.checked;
    };
    document.querySelector('#noiseCB').onchange = e => {
      drawParams.showNoise = e.target.checked;
    };
    document.querySelector('#invertCB').onchange = e => {
      drawParams.showInvert = e.target.checked;
    };
    document.querySelector('#embossCB').onchange = e => {
      drawParams.showEmboss = e.target.checked;
    };
    document.querySelector('#tintCB').onchange = e => {
      drawParams.showTint = e.target.checked;
    };
    document.querySelector('#curvesCB').onchange = e => {
      drawParams.quadraticCurves = e.target.checked;
    };
    document.querySelector('#cooldownCB').onchange = e => {
      freezeCooldown = e.target.checked;
    };
    //add .onclick event to button       
    playButton.onclick = e =>{
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);
        
        //check if context is in suspended state (autoplay policy)
        if(audio.audioCtx.state== "suspended"){
            audio.audioCtx.resume();
        }
        
        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
        if(e.target.dataset.playing == "no"){
            //if track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes"; //our CSS will set the text to pause
            //if track is playing, pause it
        }
        else{
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no"; //our CSS will set the text to play
        }
    }
    
    //C - hookup volume slider and label
    let volumeSlider= document.querySelector("#volumeSlider");
    let volumeLabel = document.querySelector("#volumeLabel");
    
    //add .oninput event to slider
    volumeSlider.oninput= e =>{
        //set the gain
        console.log(e.target.value);
        audio.setVolume(e.target.value);
        //update value of label to match value of slider
        volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
    };
    
    //set value of label to match initial value of slider    
    volumeSlider.dispatchEvent(new Event("input"));
    
   
	  
    //D - hookup track select
    //add .onchange event to select
    trackSelect.onchange = e =>{
        audio.loadSoundFile(e.target.value);
        //pause the current track if it is playing
        if(playButton.dataset.playing="yes"){
            playButton.dispatchEvent(new MouseEvent("click"));
        };
    }
    
    dataSelect.onchange = e =>{
        if(dataSelect.value == "waveform")
        {
            drawParams.useWaveForm = true;
        }
        else
        {
            drawParams.useWaveForm = false;
        }
    }
    //tintSelect.onchange = e =>{
    //    console.log(e.target.value);
    //    drawParams.tintStyle = e.target.value;
    //}
    console.log(tintSelect.value);
    //for(let i=0;i<tintSelect.length;i++)
    //    {
    //        console.log(tintSelect[i]).value;
    //        if(tintSelect[i].checked)
    //            {
    //                drawParams.tintStyle = tintSelect[i].value;
    //            }
    //    }
} // end setupUI

export {init};
        