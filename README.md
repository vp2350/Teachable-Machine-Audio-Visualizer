
# Teachable Machine Audio Visualizer:

[Link to live project](https://people.rit.edu/vp2350/330/tm-my-image-model/AudioHW%20-%203/)

Please read the instructions before use

The visualizer was trained on a limited model so results might vary.

### Theme

The app is an audio visualizer that lets you play a song by making the respective hand signs for the song in front of the webcam.

It lets you switch between several settings and choose different visualizer options for the audio, including switching between the type of audio data (frequency and waveform).

The progress bar shows the current progress of the song in both in a visual manner and through text.

The quadrative curves show beats clearly using the red lines.

### User Experience

The app starts with the music paused and the instruction on how to use the Teachable Machine to play a song. 

The user controls are as follows:

#### Buttons

The project has 3 buttons:

##### Start

This button starts the Teachable Machine and activates the webcam

##### Play/Pause

This button helps the user play and pause the music as needed

##### Full Screen

This button lets the user full screen into the visualizer. You can press the Escape key to exit the full screen

#### Selectors

The program has the following select elements:


##### Track

This selector lets the user select the current track, and can be changed using the teachable machine as well

##### Data Type

This selector changes the audio data that the visualizer receives (frequency or waveform)

#### Radio Button

The only Radio Button the project has is the "Tint Style", which lets the user pick between 4 different styles

#### Checboxes

The app uses the following checkboxes:

##### Freeze Cooldown

This freezes the cooldown so you can play the song all the way to the end.

##### Show Gradient

This changes the background to a gradient.

##### Show lines

This shows the audio visualizer lines from left to right on alternative sides of the x axis with each iteration.

##### Show bouncing lines

This shows detached audio lines that bounce on the top and bottom of the x axis.

##### Show Quadratic curves

Ths displays quadratic curves on the y-axis with lower frequencies highlighted as red and the higher ones going towards a light purple. This is the best option to see the song beats.

##### Show circles

This displays 3 different circles laid from left to left on the canvas. It is pretty efficient in showing the beats of the song.

##### Show Noise

This adds noise to the canvas

###### Invert Colors

This inverts the colors of the canvas

###### Show Emboss

This adds an emboss effect to the canvas

##### Tint

This adds the selected tint to the canvas

### Bugs

The program works as it should besides the fact that the teachable machine is not trained perfectly and sometines also picks up a "sign" too quickly without it actually being made. I could not get other people to come over to help with sampls due to COVID.

### Media

The html of the file is divided into several different elements including divs, labels, sections and headings which are used to structure the document properly.

There are 3 external song files the app uses:
New Adventure Theme Song
Peanuts Theme Song
The Picard Song

The css for the file is hosted in the default-styles.css file and uses the Mulish google font and several other interactive styles for the buttons and selectors.

Both the HTML and CSS pass validation

### Code

Index.html has some JavaScript code that runs the teachable machine.
The rest of the code is hosted in ES6 modules:

#### main.js

This file hosts the main functions of the project, including Init and the update loop

It sends in the parameters to canvas.js to give drawing instructions

This file also handles the UI

#### utils.js

This file contains all the utility functions used throughout the app

#### loader.js

This file is the front facing file that calls main.js's init on window load

#### audio.js

This file is what is used to load and play all the audio

#### canvas.js

This file is where all the drawing in the app is taken care of

### Above and Beyond and Expected Grade

Where I went above and beyond in this project is using the Teachable Machine to detect hand signs to run particular songs.

The machine runs as well as it should given the fact thata it is harder to find volunteers to help train it better and there is also an option to put it on cooldown so it doesn't keep switching between songs.


