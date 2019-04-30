// Mono color animation

// Everything is drawn on canvas.
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

// Make canvas resize automatically to full window area
holocanvas.makeCanvasAutoFullwindow(canvas)
holocanvas.makeCursorDisappear(canvas)

holocanvas.start({
  initModel: function () {
    return {
      x: 0 // pixels
    }
  },
  tickModel: function (model, dt) {
    // dt: simulation time, seconds
    var v = 150 // px / second
    model.x = (model.x + v* dt) % canvas.width
  },
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
