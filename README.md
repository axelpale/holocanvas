# holocanvas

A minimal framework for canvas effect animations. The original need was to create holographic effects for projection mapping purposes.

See [some example apps and more](https://axelpale.github.io/holocanvas/).

## Your first holo:

Let's make a green laser line scanner:

app.js:

  // The animation is drawn on canvas.
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')

  // Fullsize canvas.
  // Make canvas resize automatically to full window area
  holocanvas.makeCanvasAutoFullwindow(canvas)
  holocanvas.makeCursorDisappear(canvas)

  // Start the animation. Animation is a set of three functions.
  holocanvas.start({

    // Init Model Function. Returns the initial state of the animation.
    initModel: function () {
      return {
        x: 0 // pixels
      }
    },

    // Tick Model Function. Simulate how the state changes during a frame.
    tickModel: function (model, dt) {
      // dt: simulation time, seconds
      var v = 150 // px / second
      model.x = (model.x + v* dt) % canvas.width
    },

    // Tick View Function. Draw the state.
    tickView: function (model) {
      var x = model.x.toFixed(0)
      var W = canvas.width
      var H = canvas.height

      // Tips:
      //   Clear canvas to make transparent layers:
      //     ctx.clearRect(0, 0, W, H)
      //
      //   Fill background with color:
      //     ctx.fillStyle = 'hsla(360, 100%, 50%)'
      //     ctx.fillRect(0, 0, W, H)
      //

      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, W, H)

      ctx.beginPath();       // Start a new path
      ctx.moveTo(x, 0);    // Move the pen to (30, 50)
      ctx.lineTo(x, H);  // Draw a line to (150, 100)
      ctx.strokeStyle = 'rgb(0,255,0)'
      ctx.lineWidth = 2;
      ctx.stroke(); // Render the path
    }
  });

index.html:

  <!DOCTYPE html>
  <html lang="en">
  <head>
  	<meta charset="utf-8">
  	<title>Your first holo</title>
    <link rel='shortcut icon' type='image/x-icon' href='favicon.ico'>
  	<link rel="stylesheet" href="style.css">
  	<!--[if IE]>
  		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  	<![endif]-->
  </head>

  <body>
    <canvas id="canvas"></canvas>
    <script src="../../holocanvas/index.js"></script>
    <script src="app.js"></script>
  </body>
  </html>

style.css:

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 16px;
    background: white;
  }

  #canvas {
    position: fixed;
    top: 0px;
    left: 0px;
    display: block;
    margin: 0;
    width: 100%;
    height: 100%;
  }

Then just open `index.html` in a web browser and enjoy!
